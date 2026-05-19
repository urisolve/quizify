document.addEventListener('DOMContentLoaded', () => {

  // 1. Seleção independente por bloco de perguntas
  document.querySelectorAll('.answer-option').forEach(label => {
    label.addEventListener('click', function () {
      const cardContainer = this.closest('.card-body');
      
      if (cardContainer) {
        cardContainer.querySelectorAll('.answer-option').forEach(l => {
          l.classList.remove('selected');
        });
      }
      
      this.classList.add('selected');
      
      const radio = this.querySelector('input[type="radio"]');
      if (radio) {
        radio.checked = true;
      }
    });
  });

  // 2. Validação antes de submeter (foco no topo da página)
  const form = document.getElementById('quiz-form');
  const alertPlacement = document.getElementById('alert-placement');

  if (form) {
    form.addEventListener('submit', function (e) {
      const questionBlocks = document.querySelectorAll('.answers-area');
      let allValid = true;
      let missingCount = 0;

      questionBlocks.forEach(block => {
        const checkedRadio = block.querySelector('input[type="radio"]:checked');

        if (!checkedRadio) {
          allValid = false;
          missingCount++;
        }
      });

      if (!allValid) {
        e.preventDefault(); // Impede o envio do formulário

        if (alertPlacement) {
          // Renderiza o banner de aviso estilo Bootstrap/Tabler
          alertPlacement.innerHTML = `
            <div class="alert alert-danger d-flex align-items-center gap-2 mb-0 shadow-sm" role="alert">
              <i class="ti ti-alert-circle fs-4"></i>
              <div>
                <strong>Atenção!</strong> Faltam responder a <b>${missingCount}</b> pergunta(s). Por favor, preenche todos os campos antes de submeter.
              </div>
            </div>
          `;
          alertPlacement.classList.remove('d-none');
        }

        // Envia o utilizador suavemente para o início absoluto da página
        window.scrollTo({ top: 0, behavior: 'smooth' });

      } else {
        // Limpa o alerta caso tudo esteja correto
        if (alertPlacement) {
          alertPlacement.classList.add('d-none');
          alertPlacement.innerHTML = '';
        }
      }
    });
  }
});