const board = document.querySelector("#board");
const cells = board.querySelectorAll(".cell");

let turn = "X";

function handleClick(cell) {
  cell.textContent = turn;
  cell.classList.add("occupied");

  // Verifica se há um vencedor
  const winner = checkWinner();
  if (winner) {
    alert(`${winner} venceu!`);
    return;
  }

  // Troca de jogador
  turn = turn === "X" ? "O" : "X";
}

for (const cell of cells) {
  cell.addEventListener("click", handleClick);
}

function checkWinner() {
  // Verifica linhas
  for (let i = 0; i < 3; i++) {
    if (cells[i].textContent === cells[i + 3].textContent &&
      cells[i].textContent === cells[i + 6].textContent &&
      cells[i].textContent !== "") {
      return cells[i].textContent;
    }
  }

  // Verifica colunas
  for (let i = 0; i < 3; i++) {
    if (cells[i * 3].textContent === cells[i * 3 + 1].textContent &&
      cells[i * 3].textContent === cells[i * 3 + 2].textContent &&
      cells[i * 3].textContent !== "") {
      return cells[i * 3].textContent;
    }
  }

  // Verifica diagonais
  if (cells[0].textContent === cells[4].textContent &&
    cells[0].textContent === cells[8].textContent &&
    cells[0].textContent !== "") {
    return cells[0].textContent;
  }

  if (cells[2].textContent === cells[4].textContent &&
    cells[2].textContent === cells[6].textContent &&
    cells[2].textContent !== "") {
    return cells[2].textContent;
  }

  // Verifica se o jogo está empatado
  for (const cell of cells) {
    if (cell.textContent === "") {
      return null;
    }
  }

  return "Empate";
}
