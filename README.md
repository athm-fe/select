# Select

## TODO

* 键盘功能支持 Up、Down、Enter、ESC
* 多选支持

## Usage

可以通过两种方式来初始化 Select 控件, 你可以根据自己的需要来进行选择. 另外, 对话框的关闭也非常方便.

### Via data attributes

无需写 JavaScript , 即可启用对话框. 在一个触发元素（比如按钮）上设置 `data-toggle="select"` , 然后通过 `data-target="#ID"` 指定一个对应的要打开的弹出层.

```html
<div class="select" data-toggle="select" data-active-class="athm-active">...</div>
```

### Via JavaScript

直接在对应的弹出层 DOM 上调用即可.

```javascript
$('#select').select(options);
```

## Options

参数可以通过 data attributes 或者 JavaScript 两种方式来配置.

Name | Type | Default | Description
---- | ---- | ------- | -----------
selectPicker | string | `'[data-select-picker]'` | 触发容器
selectValue | string | `'[data-select-picker]'` | 值容器
selectDropdown | string | `'[data-select-picker]'` | 下拉容器
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