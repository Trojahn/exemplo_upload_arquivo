# Exemplo de Upload de Arquivo Node + Express + React

> Sistema composto de backend/frontend para demonstrar as capacidades de upload e armazenamento no sistema de arquivos de imagens enviadas por um cliente. O sistema foi desenvolviddo utilizando backend node, express e postgreSQL. O frontend foi desenvolvido por meio do React. 

## Funcionamento

Nesta versão do sistema, o backend aceita arquivos de imagem com até 5MB de tamanho. O arquivo é salvo em uma pasta `uploads` com um UUID gerado automaticamente. No banco de dados, para cada arquivo é armazenado a data do upload e o nome original. O sistema permite inclusive o upload de arquivos iguais e/ou com mesmo nome.

O frontend permite o envio de novas imagens ao servidor, contendo também uma seção que exibe todas as imagens já enviadas.

Este sistema foi configurado para ambiente de desenvolvimento. Para implantação em produção, revise as variáveis de ambiente, configurações de CORS e segurança do banco de dados.

## ⚠️ Avisos

Este código é puramente didático e deve ser utilizado apenas como modelo inicial de desenvolvimento.

## 🚀 Executando o Sistema

Para subir o banco de dados e o servidor Node.js automaticamente, utilize o terminal na raiz do projeto e execute:

```
docker compose up --build -d
```

## 🚀 Reiniciando o servidor

Caso queira reiniciar o servidor em algum momento, sem perder os arquivos desenvolvidos, execute os seguintes comandos...

```
docker compose down -v
docker compose up --build -d
```

Note que os arquivos enviados anteriormente, e que estão na pasta de `uploads`, ficarão órfãos, ou seja, não serão mais reconhecidos pelo backend e inacessíveis pelo servidor.

## ☕ Endereços para acesso

O backend pode ser acessado pelo endereço:

```
http://localhost:3000/
```

Já o frontend pode ser acessado pelo endereço:

```
http://localhost:5173/
```
