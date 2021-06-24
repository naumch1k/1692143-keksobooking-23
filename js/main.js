import { changeFormsState } from './form.js';
import { renderCardListElement } from './card-list.js';
import { enableValidation } from './validation.js';

// 'true' attr for changeFormsState() disables forms, 'false' enables
changeFormsState(false);
renderCardListElement();
enableValidation();
