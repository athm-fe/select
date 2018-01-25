# Select

## TODO

* 键盘功能支持 Up、Down、Enter、ESC
* 多选支持

## Usage

可以通过两种方式来初始化 Select 控件, 你可以根据自己的需要来进行选择.

### Via data attributes

无需写 JavaScript , 即可启用下拉框.

```html
<div class="select" data-toggle="select">
  <div class="select__picker" data-select-picker>
    <span class="select__value" data-select-value>选择品牌</span>
    <i class="select__caret"></i>
  </div>
  <div class="select__dropdown" data-select-dropdown>
    <ul>
      <li data-value="1" data-text="阿斯顿·马丁1"><b>A</b><span>阿斯顿·马丁1</span></li>
      <li data-value="2" data-text="阿斯顿·马丁2"><b>A</b><span>阿斯顿·马丁2</span></li>
      <li data-value="3" data-text="阿斯顿·马丁3"><b>A</b><span>阿斯顿·马丁3</span></li>
      <li data-value="4" data-text="阿斯顿·马丁4"><b>B</b><span>阿斯顿·马丁4</span></li>
      <li data-value="5" data-text="阿斯顿·马丁5"><b>C</b><span>阿斯顿·马丁5</span></li>
      <li data-value="6" data-text="阿斯顿·马丁6"><b>D</b><span>阿斯顿·马丁6</span></li>
    </ul>
  </div>
</div>
```

### Via JavaScript

直接在对应的下拉框 DOM 上调用即可.

```javascript
$('#select').select(options);
```

## Options

参数可以通过 data attributes 或者 JavaScript 两种方式来配置.

Name | Type | Default | Description
---- | ---- | ------- | -----------
selectPicker | string | `'[data-select-picker]'` | 触发容器
selectValue | string | `'[data-select-value]'` | 值容器
selectDropdown | string | `'[data-select-dropdown]'` | 下拉容器
selectedClass | string | `'selected'` | 选中选项使用的样式类.
disabledClass | string | `'disabled'` | 下拉框禁用状态样式类.
activeClass | string | `'active'` | 下拉框激活状态样式类.

## Methods

### `.select(options)`

初始化当前 DOM 内容为一个下拉框, 可以接受参数进行配置.

```javascript
$('#select').select({});
```

### `.select('show')`

手动打开对话框.

```javascript
$('#select').select('show');
```

### `.select('hide')`

手动关闭对话框.

```javascript
$('#select').select('hide');
```

### `.select('toggle')`

手动打开或者关闭.

```javascript
$('#select').select('toggle');
```

### `.select('disable')`

禁用.

```javascript
$('#select').select('disable');
```

### `.select('enable')`

非禁用.

```javascript
$('#select').select('enable');
```

### `.data('fe.select').setValue({})`

设置值

### `.data('fe.select').getValue()`

获取值

## Event

Event Type | Description
---------- | -----------
init.fe.select | 下拉框初始化时触发.
show.fe.select | 当 `show` 方法被调用, 此事件会立即触发.
shown.fe.select | 下拉框已呈现完毕时触发.
hide.fe.select | 当 `hide` 方法被调用, 此事件会立即触发.
hidden.fe.select | 下拉框已隐藏完毕时触发.
change.fe.select | 当值发生变化时触发. 回调函数接受参数为 `event` , 当前选项值 `data` (`{text: '', value: ''}`) 和当前选项 `$item` 。

```javascript
$('#select').on('show.fe.select', function (e) {
  // 阻止下拉框打开
  e.preventDefault();
});
```

# End

Thanks to [Bootstrap](http://getbootstrap.com/)