#!/bin/zsh
# Clique duas vezes neste arquivo para ligar o Jarvis da Bevel.
cd "$(dirname "$0")"
export PATH="$HOME/.local/bin:/opt/homebrew/bin:/usr/local/bin:$PATH"

if [ ! -d node_modules ]; then
  echo "Primeira vez: instalando o Jarvis (leva 1 minuto)..."
  npm install || { echo "Não deu para instalar. Chame o Claude."; read; exit 1; }
fi

(sleep 3 && open -a "Google Chrome" "http://localhost:4321") &
npm start
