# Vercel Build Configuration

## 问题原因

当前项目有以下问题导致 Vercel 导入失败：

1. **缺少 `vercel.json`**：Vercel 不知道使用 pnpm 作为包管理器
2. **自定义服务器 `src/server.ts`**：Vercel 使用 Edge Runtime，不需要也不支持自定义 HTTP 服务器
3. **`.npmrc` 配置的 registry**：`https://registry.npmmirror.com` 可能导致 Vercel 构建失败

## 解决方案

### 1. 创建 `vercel.json`

已在项目根目录创建 `vercel.json`，配置：
- 使用 pnpm 作为包管理器
- 使用 `pnpm build` 作为构建命令
- 指定 Node.js 运行时

### 2. 修复 `.npmrc`（可选）

如果 Vercel 构建时遇到依赖安装问题，临时注释掉 `.npmrc` 中的 registry 配置：

```bash
# 临时注释掉这行
# registry=https://registry.npmmirror.com
```

或者创建 `.npmrc.vercel` 在 Vercel 构建时使用：

```bash
# .npmrc.vercel
registry=https://registry.npmjs.org/
```

### 3. 保留/删除 `server.ts`

**选项 A：保留 server.ts（本地开发使用）**
- 不需要在 GitHub 上传时排除
- Vercel 部署会使用 `vercel.json` 的配置，忽略 `server.ts`

**选项 B：删除 server.ts（仅使用 Vercel）**
```bash
rm src/server.ts
```

### 4. 更新 `.coze` 文件（可选）

如果不再使用 Coze CLI 部署，可以简化：

```toml
[project]
requires = ["nodejs-20"]

[dev]
build = ["pnpm", "install"]
run = ["pnpm", "dev"]

[deploy]
build = ["pnpm", "build"]
run = ["pnpm", "start"]
```

## Vercel 导入步骤

1. 将修复后的代码推送到 GitHub
2. 登录 Vercel → "Import Project"
3. 选择 GitHub 仓库
4. Vercel 会自动读取 `vercel.json` 配置
5. 点击 "Deploy"

## 注意事项

- Vercel 会自动使用 Next.js 的文件系统路由
- 环境变量需要在 Vercel Dashboard 中设置
- 不需要 `server.ts`，Vercel 会自动处理请求
