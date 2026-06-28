负责代理: Page Agent

# Assets 目录

页面中使用的公共静态资源（图片、logo、占位图等）。

## 规则

1. **只放页面实际引用的资源**：logo、产品截图、占位图、默认头像等
2. **禁止放设计参考图**：Figma 截图、设计稿对照图不放这里
3. **禁止放字体文件**：字体在 `fonts/` 目录
4. **禁止放组件 CSS/HTML**：组件在 `components/` 目录

## 命名规范

- 全小写 kebab-case：`logo.png`、`default-avatar.png`、`empty-state.svg`
- 按用途命名，不按设计稿编号命名
- 通用图用英文，业务图可中文拼音

## 引用路径

| 引用位置 | 路径 |
|---------|------|
| `pages/{端}/{页面}/` | `../../../assets/logo.png` |
| `pages/{端}/{页面}/pending/` | `../../../../assets/logo.png` |
| `components/{端}/{组件}/` | `../../../assets/logo.png` |
| `fragment/{端}/{容器}/` | `../../../assets/logo.png` |

## 目录结构

```
assets/
├── RULES.md        本文件
├── logo.png        产品 logo
└── ...             其他公共图片
```

## 谁可以操作

- **Page Agent** 可以往这里放页面需要的图片
- **Component Agent** 如果组件预览需要图片也可以放
- 其他 Agent 不要动这个目录
