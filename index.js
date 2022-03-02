function Person(options) {
  console.log(this,'----this---',)
  // console.log(options.data.bind(this)())
  this.$options = options;
  initData(this);
  initMethods(this);
}

function initMethods(th) {
  console.log(th,'111')
  Object.keys(th.$options.methods).forEach((key) => {
    th[key] = th.$options.methods[key].bind(th)
  });
}

function initData(th) {
  th._data = th.$options.data.bind(th)();
  // console.log(obj,th,this)

  // 原本访问： p.data.name;
  // 代理之后： p.name
  // 在get或者set中，设置的p.data.name

  const fn = function (source, key) {
    Object.defineProperty(th, key, {
      enumerable: true,
      configurable: true,
      get: function () {
        return th[source][key];
      },
      set: function (val) {
        th[source][key] = val;
      },
    });
  };
  Object.keys(th._data).forEach((key) => {
    fn("_data", key);
  });

  console.log(th);
}

const p = new Person({
  data: () => {
    return {
      name: "test",
    };
  },
  methods: {
    getName() {
      return this.name;
    },
  },
});

console.log(p,'pw')
console.log(p.name, "p.name");
console.log(p.getName(),'p.methods')
