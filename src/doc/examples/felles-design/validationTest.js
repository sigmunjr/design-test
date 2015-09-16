$(document).on('ready', function () {
    function phoneValidation (elm, onkeydown) {
        var errorContainer = $(elm).siblings('#phoneValidationErrors');
        if (!/^\d+$/.test(elm.value)) {
            if (errorContainer.length) return;
            $(elm).keydown(function () {
                phoneValidation(elm, true)
            });
            $(elm).addClass('haveErrors');
            $(elm).after('<div class="error-messages" id="phoneValidationErrors"><div class="error-message">Telefonnummeret er ikke gyldig.</div></div>')
        } else {
            if (!onkeydown) $(elm).off('keydown');
            $(elm).removeClass('haveErrors');
            $(elm).siblings('#phoneValidationErrors').remove();
        }
    }

    window.phoneValidation = phoneValidation;
})
;
