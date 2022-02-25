from datetime import datetime

title = input("Título: ")

resume = ""

par = ""

while True:
    par = input("Paragraph: ")
    if par == "0":
        break
    resume += "        <p>" + par + "</p>\n"

resultados = ""

url = ""
texto = "" 

while True:
    url = input("url: ")
    if url == "0":
        break
    texto = input("texto: ")
    resultados += "        <resultado><url>" + url + "</url><texto>" + texto + "</texto></resultado>\n"

text = f'''<?xml version="1.0" encoding="UTF-8"?>
<doc>
    <meta>
        <titulo>{title}</titulo>
        <data>{datetime.today().strftime('%Y-%m-%d')}</data>
        <autor>
            <id>PG47626</id>
            <nome>Rúben Correia Cerqueira</nome>
        </autor>
        <uc>
            <sigla>RPCW2022</sigla>
            <nome>Representação e Processamento de Conhecimento Web</nome>
        </uc>
    </meta>
    <resumo>
{resume}
    </resumo>
    <resultados>
{resultados}
    </resultados>
</doc>'''

with open("manifest.xml","w") as f:
    f.write(text)