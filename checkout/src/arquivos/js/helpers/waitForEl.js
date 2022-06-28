/**
 * Espera um elemento exitir no dom e executa o callback
 *
 * @param {string} selector seletor do elemento que dejesa esperar pela criação
 * @param {function} callback Função a ser executada quando tal elemento existir
 */

export default function waitForEl(selector) {
    return new Promise((resolve) => {
        function waitForElCb(selector) {
            if (jQuery(selector).length) {
                resolve(jQuery(selector));
            } else {
                setTimeout(function () {
                    waitForElCb(selector);
                }, 100);
            }
        }
        waitForElCb(selector);
    });
}
