import { Router } from '../js/router.js';
import { HomeView } from '../js/views/home.js';
import { ProjetosView } from '../js/views/projetos.js';
import { CadastroView } from '../js/views/cadastro.js';

const root = document.getElementById('app');
const mount = (View) => () => View.mount(root);

const router = new Router();
router.register('#/home',     mount(HomeView));
router.register('#/projetos', mount(ProjetosView));
router.register('#/cadastro', mount(CadastroView));
router.notFound(() => { location.hash = '#/home'; });
router.start();
