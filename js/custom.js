(function() {
	'use strict';

	var tinyslider = function() {
		var el = document.querySelectorAll('.testimonial-slider');

		if (el.length > 0) {
			var slider = tns({
				container: '.testimonial-slider',
				items: 1,
				axis: "horizontal",
				controlsContainer: "#testimonial-nav",
				swipeAngle: false,
				speed: 700,
				nav: true,
				controls: true,
				autoplay: true,
				autoplayHoverPause: true,
				autoplayTimeout: 3500,
				autoplayButtonOutput: false
			});
		}
	};
	tinyslider();

	


	var sitePlusMinus = function() {

		var value,
    		quantity = document.getElementsByClassName('quantity-container');

		function createBindings(quantityContainer) {
	      var quantityAmount = quantityContainer.getElementsByClassName('quantity-amount')[0];
	      var increase = quantityContainer.getElementsByClassName('increase')[0];
	      var decrease = quantityContainer.getElementsByClassName('decrease')[0];
	      increase.addEventListener('click', function (e) { increaseValue(e, quantityAmount); });
	      decrease.addEventListener('click', function (e) { decreaseValue(e, quantityAmount); });
	    }

	    function init() {
	        for (var i = 0; i < quantity.length; i++ ) {
						createBindings(quantity[i]);
	        }
	    };

	    function increaseValue(event, quantityAmount) {
	        value = parseInt(quantityAmount.value, 10);

	        console.log(quantityAmount, quantityAmount.value);

	        value = isNaN(value) ? 0 : value;
	        value++;
	        quantityAmount.value = value;
	    }

	    function decreaseValue(event, quantityAmount) {
	        value = parseInt(quantityAmount.value, 10);

	        value = isNaN(value) ? 0 : value;
	        if (value > 0) value--;

	        quantityAmount.value = value;
	    }
	    
	    init();
		
	};
	sitePlusMinus();

	// Chức năng tìm kiếm sản phẩm
	var productSearch = function() {
		var searchForm = document.querySelector('.search-form');
		
		if (searchForm) {
			searchForm.addEventListener('submit', function(e) {
				e.preventDefault();
				var searchInput = searchForm.querySelector('input[name="search"]').value.toLowerCase();
				var productItems = document.querySelectorAll('.product-item');

				if (searchInput === '') {
					// Hiển thị tất cả sản phẩm nếu ô tìm kiếm trống
					productItems.forEach(function(item) {
						item.closest('.col-12').style.display = 'block';
					});
				} else {
					// Lọc sản phẩm dựa trên từ khóa tìm kiếm
					productItems.forEach(function(item) {
						var productTitle = item.querySelector('.product-title').textContent.toLowerCase();
						var productPrice = item.querySelector('.product-price').textContent.toLowerCase();
						
						if (productTitle.includes(searchInput) || productPrice.includes(searchInput)) {
							item.closest('.col-12').style.display = 'block';
						} else {
							item.closest('.col-12').style.display = 'none';
						}
					});
				}
			});
		}
	};
	productSearch();

})();