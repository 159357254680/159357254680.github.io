# 使用 Node.js 22 作为构建环境
FROM node:22 AS builder

# 设置工作目录
WORKDIR /app

# 复制 package.json 和 package-lock.json
COPY package*.json ./

# 安装依赖
RUN npm install --frozen-lockfile

# 复制前端代码
COPY . .

# 构建前端项目
RUN npm run build

# 使用 Caddy 作为服务器
FROM caddy:latest AS server

# 设置工作目录
WORKDIR /srv

# 复制构建后的前端文件
COPY --from=builder /app/dist /srv

# 复制 Caddyfile
COPY Caddyfile /etc/caddy/Caddyfile

# 运行 Caddy
CMD ["caddy", "run", "--config", "/etc/caddy/Caddyfile"]
