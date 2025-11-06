import { html, button } from '../templates.js';
import { storage } from '../storage.js';

const K = 'mensagens';

export const CadastroView = {
  mount(root) {
    root.innerHTML = html`
      <section id="sobre" class="section">
        <h3 class="section-title">Fique à vontade para entrar em contato conosco:</h3>

        <form id="contatoForm" autocomplete="on" class="cadastro-form">
          <div class="card">
            <fieldset>
              <legend>Dados pessoais</legend>

              <label for="nome">Nome completo</label>
              <input
                id="nome"
                name="nome"
                type="text"
                placeholder="Digite seu nome"
                required
                aria-required="true"
              >

              <label for="email">E-mail</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="exemplo@email.com"
                required
                autocomplete="email"
                aria-required="true"
              >

              <label for="cpf">CPF</label>
              <input
                id="cpf"
                name="cpf"
                type="text"
                placeholder="000.000.000-00"
                maxlength="14"
                inputmode="numeric"
                pattern="\\d{3}\\.\\d{3}\\.\\d{3}-\\d{2}|\\d{11}"
                title="Use 000.000.000-00 ou 11 dígitos"
                aria-describedby="cpfHelp"
              >
              <small id="cpfHelp" class="form-help">
                Opcional — apenas números ou formato pontuado.
              </small>

              <label for="telefone">Telefone</label>
              <input
                id="telefone"
                name="telefone"
                type="tel"
                placeholder="(11) 99999-9999"
                inputmode="tel"
                pattern="\\(?\\d{2}\\)?\\s?\\d{4,5}-?\\d{4}"
                title="Ex.: (11) 99999-9999"
              >

              <label for="dataNascimento">Data de nascimento</label>
              <input
                id="dataNascimento"
                name="dataNascimento"
                type="date"
                autocomplete="bday"
              >
            </fieldset>
          </div>

          <div class="card grid">
            <fieldset>
              <legend>Endereço</legend>

              <label for="endereco">Endereço</label>
              <input
                id="endereco"
                name="endereco"
                type="text"
                placeholder="Rua, número, complemento"
                autocomplete="street-address"
              >

              <label for="cep">CEP</label>
              <input
                id="cep"
                name="cep"
                type="text"
                placeholder="00000-000"
                maxlength="9"
                inputmode="numeric"
                pattern="\\d{5}-?\\d{3}"
                title="Ex.: 01234-567"
                autocomplete="postal-code"
              >

              <label for="cidade">Cidade</label>
              <input
                id="cidade"
                name="cidade"
                type="text"
                placeholder="Sua cidade"
                autocomplete="address-level2"
              >

              <label for="estado">Estado (UF)</label>
              <input
                id="estado"
                name="estado"
                type="text"
                placeholder="SP"
                maxlength="2"
                autocomplete="address-level1"
              >
            </fieldset>

            <aside class="card">
              <fieldset>
                <legend>Mensagem</legend>
                <label for="mensagem">Digite uma mensagem</label>
                <textarea
                  id="mensagem"
                  name="mensagem"
                  rows="6"
                  placeholder="Em caso de dúvida, deixe sua mensagem..."
                  required
                ></textarea>
              </fieldset>

             <div class="actions">
                ${button('Enviar', 'type="submit" class="btn-primary"')}
              </div>


              <div class="ultimas-mensagens">
                <h4>Últimas mensagens</h4>
                <ul id="msgs" class="ongc-list small"></ul>
              </div>
            </aside>
          </div>
        </form>
      </section>
    `;

    // lista de mensagens recentes
    const msgs = root.querySelector('#msgs');
    const render = () => {
      const arr = storage.get(K, []);
      msgs.innerHTML =
        arr
          .slice(-5)
          .reverse()
          .map(
            (m) => `
        <li class="list-item">
          <strong>${m.nome || '(sem nome)'}</strong>
          <br>
          <small class="muted">${m.email || '(sem e-mail)'}</small>
          <div class="muted">${m.mensagem || ''}</div>
        </li>`
          )
          .join('') || '<li class="muted">Sem mensagens ainda.</li>';
    };
    render();

    // máscara CPF
    const cpfInput = root.querySelector('#cpf');
    if (cpfInput) {
      cpfInput.addEventListener('input', (e) => {
        e.target.value = e.target.value
          .replace(/\D/g, '')
          .replace(/(\d{3})(\d)/, '$1.$2')
          .replace(/(\d{3})(\d)/, '$1.$2')
          .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
          .slice(0, 14);
      });
    }

    // máscara telefone
    const telInput = root.querySelector('#telefone');
    if (telInput) {
      telInput.addEventListener('input', (e) => {
        e.target.value = e.target.value
          .replace(/\D/g, '')
          .replace(/^(\d{2})(\d)/, '($1) $2')
          .replace(/(\d{5})(\d{4}).*/, '$1-$2')
          .slice(0, 15);
      });
    }

    // máscara CEP simples
    const cepInput = root.querySelector('#cep');
    if (cepInput) {
      cepInput.addEventListener('input', (e) => {
        e.target.value = e.target.value
          .replace(/\D/g, '')
          .replace(/(\d{5})(\d)/, '$1-$2')
          .slice(0, 9);
      });
    }

    // submit: salva no storage e atualiza lista
    root.querySelector('#contatoForm').addEventListener('submit', (e) => {
      e.preventDefault(); // SPA: não envia pra outro lugar

      const data = Object.fromEntries(new FormData(e.target).entries());
      data.dataEnvio = new Date().toISOString();

      storage.update(K, (a) => [...a, data], []);
      e.target.reset();
      render();
      alert('Mensagem enviada! Aguarde nosso contato.');
    });
  },
};
