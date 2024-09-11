import { onDomChange } from '../theme/utils/init';

window.StoreConnectUI = window.StoreConnectUI || {};

window.StoreConnectUI.Sort = function () {
  onDomChange(init);

  function init(node) {
    const input = node.querySelector('form[data-filters] input[name=sort]');

    if (input) {
      document.querySelector('[data-sort] input[name=sort][value=' + input.value + ']').setAttribute('checked', true);
    }
  }

  return {
    update: id => {
      document.querySelector('form[data-filters] input[name=sort]').value = id;
      document.querySelector('form[data-filters]').submit();
    }
  }
}();
