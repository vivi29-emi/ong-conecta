import { html } from '../templates.js';

export const ProjetosView = {
  mount(root) {
    root.innerHTML = html`
      <section class="projetos-page">
        <div class="site-hero">
          <h1>ONGs Parceiras</h1>
          <p>Conheça algumas organizações que fazem a diferença</p>
        </div>

        <!-- Grid de Cards -->
        <main aria-label="Lista de ONGs" class="cards projetos-cards">
          ${this.card(
            '../assets/img/jovens-no-cooperativismo.webp',
            'Instituto Ayrton Senna',
            'Educação de qualidade e oportunidades para jovens no Brasil.'
          )}
          ${this.card(
            '../assets/img/mataatlantica.gif',
            'SOS Mata Atlântica',
            'Restauração e preservação da Mata Atlântica e seus biomas.'
          )}
          ${this.card(
            '../assets/img/centro-de-zoonoses-pet.jpg',
            'Ampara Animal',
            'Proteção, resgate e adoção responsável de animais.'
          )}
          ${this.card(
            '../assets/img/favela.jpg',
            'Gerando Falcões',
            'Rede que combate a pobreza e desenvolve comunidades.'
          )}
          ${this.card(
            '../assets/img/Greenpeace-alerta-que-exploracao-de-petroleo-na-Foz-do-Amazonas-ameaca-o-futuro-do-Brasil.webp',
            'Greenpeace',
            'Defesa do meio ambiente e do clima em escala global.'
          )}
          ${this.card(
            '../assets/img/bg-header-unicef.avif',
            'UNICEF',
            'Saúde, educação e proteção para crianças e adolescentes.'
          )}
          ${this.card(
            '../assets/img/importancia-das-ongs.jpg',
            'Nova ONG',
            'Descrição breve da ONG, sua missão ou projeto principal.'
          )}
        </main>

        <!-- Seções abaixo dos cards -->
        <section id="voluntariado" class="section">
          <h2>🤝 Seja um Voluntário</h2>
          <p>O voluntariado é a alma do nosso trabalho. Pequenas ações geram grandes mudanças!</p>
          <ul>
            <li>📦 Apoie campanhas de arrecadação de alimentos e roupas.</li>
            <li>📚 Participe de ações educativas em escolas e comunidades.</li>
            <li>🐶 Ajude no cuidado e adoção de animais resgatados.</li>
          </ul>
          <p><b>Interessado?</b> Clique abaixo e preencha o formulário:</p>
          <a class="btn btn--dark" href="#/cadastro">Quero ser voluntário</a>
        </section>

        <hr class="divider">

        <section id="doacao" class="section">
          <h2>💖 Como Doar</h2>
          <p>Sua contribuição mantém nossos projetos ativos. Toda doação transforma vidas!</p>
          <p><b>Formas de doar:</b></p>
          <ul>
            <li>💳 Transferência bancária</li>
            <li>📱 PIX: <b>ongconecta@gmail.com</b></li>
            <li>🎁 Doações de roupas, alimentos e brinquedos</li>
          </ul>
          <p>Envie seu comprovante para <b>contato@ongconecta.org</b></p>
          <a class="btn btn--dark" href="mailto:contato@ongconecta.org">Entrar em contato</a>
        </section>
      </section>
    `;
  },

  card(img, title, desc) {
    return html`
      <article class="card">
        <img class="card__img" src="${img}" alt="${title}" loading="lazy" decoding="async" />
        <div class="card__body">
          <h2 class="card__title">${title}</h2>
          <p class="card__text">${desc}</p>
          <div class="card__actions">
            <a class="btn btn--dark" href="#">Saiba mais</a>
          </div>
        </div>
      </article>
    `;
  }
};
