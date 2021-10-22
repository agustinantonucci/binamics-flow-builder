---
order: 3
---

# API

## FlowBuilder

| 参数            | 说明                                                                                                                                                                                                                 | 类型                                                                                 | 必须 | 默认值     |
| :-------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------- | :--- | :--------- |
| backgroundColor | 背景颜色                                                                                                                                                                                                             | string                                                                               |      | `#F7F7F7`  |
| className       | 外层容器的类名                                                                                                                                                                                                       | string                                                                               |      | -          |
| drawerProps     | 配置节点时 Drawer 组件额外的 [props](https://ant.design/components/drawer/#API)。流程引擎内置了 `visible` 和 `onClose，以及` {`title`: "Configuration", `width`: 480, `destroyOnClose`: true, `maskClosable`: false} | `DrawerProps`                                                                        |      | -          |
| historyTool     | 撤销和重做                                                                                                                                                                                                           | boolean \| {hidden?: boolean, max?: number}                                          | -    | false      |
| layout          | 垂直/水平布局                                                                                                                                                                                                        | `vertical` \| `horizontal`                                                           |      | `vertical` |
| lineColor       | 连线的颜色                                                                                                                                                                                                           | string                                                                               |      | `#999999`  |
| readonly        | 只读模式，不能进行节点的增加、删除、配置                                                                                                                                                                             | boolean                                                                              |      | -          |
| registerNodes   | 注册节点                                                                                                                                                                                                             | [RegisterNode](#registernode)[]                                                      | ✓    | -          |
| spaceX          | 节点之间水平方向的间距                                                                                                                                                                                               | number                                                                               |      | `16`       |
| spaceY          | 节点之间垂直方向的间距                                                                                                                                                                                               | number                                                                               |      | `16`       |
| zoomTool        | 缩放                                                                                                                                                                                                                 | boolean \| {hidden?: boolean, min?: number, max?: number, step?: number}             | -    | false      |
| nodes           | 流程引擎的节点                                                                                                                                                                                                       | [Node](#node)[]                                                                      | ✓    | -          |
| onChange        | 节点数据改变时的回调函数                                                                                                                                                                                             | (nodes: [Node](#node)[], changeEvent?: string) => void                               | ✓    | -          |
| onHistoryChange | -                                                                                                                                                                                                                    | (params: {undoDisabled: boolean, redoDisabled: boolean}) => void                     |      | -          |
| onZoomChange    | -                                                                                                                                                                                                                    | (params: {smallerDisabled: boolean, biggerDisabled: boolean, value: number}) => void |      | -          |

## FlowBuilderInstance

| 名称    | 说明       | 类型                                  |
| :------ | :--------- | :------------------------------------ |
| history | 撤销、重做 | (type: 'undo' \| 'redo') => void      |
| zoom    | 缩放       | (type: 'smaller' \| 'bigger') => void |

## RegisterNode

| 参数               | 说明                                                                                                | 类型                                              | 必须 | 默认值                              |
| :----------------- | :-------------------------------------------------------------------------------------------------- | :------------------------------------------------ | :--- | :---------------------------------- |
| addableComponent   | 节点下方点击加号展开的内容                                                                          | React.FC\<[AddableComponent](#addablecomponent)\> |      | -                                   |
| addableNodeTypes   | 指定节点下方的可添加节点列表                                                                        | string[]                                          |      | -                                   |
| addIcon            | 在可添加节点列表中的图标（已经内置了一些图标）                                                      | React.ReactNode                                   |      | -                                   |
| conditionNodeType  | 对应的条件节点类型                                                                                  | string                                            |      | -                                   |
| configComponent    | 节点的配置表单组件                                                                                  | React.FC\<[ConfigComponent](#configcomponent)\>   |      | -                                   |
| deleteConfirmTitle | 删除节点前的提示信息。Popconfirm 组件的 [title](https://ant.design/components/popconfirm/#API) 属性 | string \| ReactNode                               |      | `Are you sure to delete this node?` |
| displayComponent   | 节点的展示组件                                                                                      | React.FC\<[DisplayComponent](#displaycomponent)\> |      | -                                   |
| extraData          | 节点的额外数据                                                                                      | any                                               |      | -                                   |
| name               | 节点名称                                                                                            | string                                            | ✓    | -                                   |
| type               | 节点类型，约定`start`和`end`为起止节点的类型                                                        | string                                            | ✓    | -                                   |

## DisplayComponent

| 参数 | 说明     | 类型          | 默认值 |
| :--- | :------- | :------------ | :----- |
| node | 节点信息 | [Node](#node) | -      |

## ConfigComponent

| 参数     | 说明                                                                                                                                | 类型                                             | 默认值 |
| :------- | :---------------------------------------------------------------------------------------------------------------------------------- | :----------------------------------------------- | :----- |
| node     | 节点信息                                                                                                                            | [Node](#node)                                    | -      |
| onCancel | 取消时调用，用来关闭抽屉                                                                                                            | () => void                                       | -      |
| onSave   | 保存节点数据时调用（自动关闭抽屉，无需再执行 onCancel），流程引擎会根据 `validateStatusError` 设置节点的 `validateStatusError` 属性 | (values: any, validateStatusError?: any) => void | -      |

### AddableComponent

| 参数      | 说明                               | 类型                   | 默认值 |
| :-------- | :--------------------------------- | :--------------------- | :----- |
| onAddNode | 增加节点时调用，会自动关闭 popover | (type: string) => void | -      |

## Node

| 参数                | 说明                                                     | 类型            | 默认值 |
| :------------------ | :------------------------------------------------------- | :-------------- | :----- |
| branchs             | 分支节点对应的条件节点数组                               | [Node](#node)[] | -      |
| configuring         | 节点是否正在配置，节点的展示组件可根据此属性高亮节点     | boolean         | -      |
| data                | 节点的数据                                               | any             | -      |
| extraData           | 节点的额外数据，也就是节点注册时的 extraData，不是深拷贝 | any             | -      |
| id                  | 节点的唯一 id                                            | string          | -      |
| name                | 节点名称，同节点注册时的 name                            | string          | -      |
| next                | 条件节点对应的子流程                                     | [Node](#node)[] | -      |
| path                | 节点在流程引擎中的路径                                   | any[]           | -      |
| type                | 节点类型，同节点注册时的 `type`                          | string          | -      |
| validateStatusError | 节点的表单校验失败，节点的展示组件可根据此属性高亮节点   | boolean         | -      |