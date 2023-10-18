$(document).ready(function() {

    $('.pass-quantity input').change(function() {
      updateQuantity(this);
    });
 
    /* Update quantity */
    function updateQuantity(quantityInput) {
      /* Calculate line price */
      var price = parseFloat(productRow.children('.product-price').text());
      var quantity = $(quantityInput).val();
      var linePrice = price * quantity;
 
      /* Update line price display and recalc cart totals */
      productRow.children('.product-line-price').each(function() {
        $(this).fadeOut(fadeTime, function() {
          $(this).text(linePrice.toFixed(2));
        });
      });
    }
 

 
  });