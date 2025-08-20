from fastapi import FastAPI  

# Cria a aplicação
app = FastAPI()

# Define uma rota para a página inicial
@app.get("/")
def ler_raiz():
    return {"Olá": "Mundo no PowerShell!"}