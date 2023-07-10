# 基于 node 镜像
FROM 18.15.0-alpine as build

# 设置工作目录
WORKDIR /app

RUN npm i -g pnpm

# 将项目依赖复制到工作目录
COPY . .
RUN pnpm install
RUN npm run build

FROM 18.15.0-alpine

COPY --from=build /app/.output ./.output
COPY --from=build /app/package.json ./

# 暴露端口
EXPOSE 3000

# 启动 nginx
CMD ["npm", "start"]