FROM node:24-alpine

# Diretório de trabalho
WORKDIR /app

# Copia apenas os arquivos de dependência
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o restante dos arquivos do projeto
COPY . .

# Porta padrão do Vite
EXPOSE 5173

ENV VITE_ALLOWED_HOST=localhost

# Comando padrão para desenvolvimento
CMD ["npm", "run", "dev"]
