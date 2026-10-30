#!/bin/zsh
# Envia o cofre (bevel/) e o Jarvis (jarvis-bevel/) para o GitHub privado da Bevel.
# Dois cliques neste arquivo. Na primeira vez o Terminal pede usuário e senha do GitHub:
# usuário = jeflucas199-debug · senha = o TOKEN criado no GitHub (não a senha normal). O Mac guarda depois.
# Nunca envia: .env (acesso ao CRM e chaves), node_modules/ e data/.
G() { git --git-dir="$HOME/.bevel-github" --work-tree="$HOME/Desktop" "$@"; }
cd "$HOME/Desktop" || exit 1
echo "Juntando as mudanças…"
G add -A
if G diff --cached --quiet; then
  echo "Nada novo desde o último envio."
else
  G commit -q -m "Atualização $(date '+%Y-%m-%d %H:%M')" && echo "Mudanças salvas no histórico."
fi
echo "Enviando para o GitHub…"
if G push -u origin main; then
  echo ""
  echo "✅ Pronto: https://github.com/jeflucas199-debug/Jarvis-bevel"
else
  echo ""
  echo "⚠️ Não foi. Se pediu senha, use o TOKEN do GitHub (veja o LEIA-ME do Jarvis, parte GitHub)."
fi
echo ""
read -k 1 "?Aperte qualquer tecla para fechar."
