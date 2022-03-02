# vue-data-methods-this
1、通过this直接访问到methods里面的函数的原因是：因为methods里的方法通过 bind 指定了this为 new Vue的实例(vm)。
2、通过 this 直接访问到 data 里面的数据的原因是：data里的属性最终会存储到new Vue的实例（vm）上的 _data对象中，访问 this.xxx，是访问Object.defineProperty代理后的 this._data.xxx。
3、Vue的这种设计，好处在于便于获取。也有不方便的地方，就是props、methods 和 data三者容易产生冲突。