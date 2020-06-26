$(document).ready(function () {
    var count = 1;
    var add_more_button = $('.add_button');
    var field_wrapper = $('#input_field_wrapper')
    var field_html = `<div class="inputField" style="margin-bottom: 5px; margin-left: 12px;">
    <input type="email" name="ValidEmails" placeholder="eg. name@gmail.com" />
    <a href="javascript:void(0);" class="remove_button"> <i class="fas fa-times" id="close-btn"></i></a>
</div>`;
    $(add_more_button).click(function () {
        count++
        $(field_wrapper).append(field_html)
    });
    $(field_wrapper).on('click', '.remove_button', function (e) {
        e.preventDefault();
        $(this).parent('div').remove(); 
        count--;
    });
});