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

	// Xử lý modal sản phẩm
	var productModal = function() {
		// Lưu trữ trạng thái body ban đầu
		var originalBodyStyle = document.body.style.cssText || '';
		var originalBodyClasses = document.body.className || '';
		
		// Lưu trữ tham chiếu đến modal đang mở
		var currentOpenModal = null;
		
		// Xử lý sự kiện click vào sản phẩm để mở modal
		var productLinks = document.querySelectorAll('.product-item');
		if (productLinks.length > 0) {
			productLinks.forEach(function(link) {
				link.addEventListener('click', function(e) {
					e.preventDefault();
					var targetSelector = this.getAttribute('data-bs-target');
					openProductModal(targetSelector);
				});
			});
		}
		
		// Xử lý tất cả các nút đóng modal
		document.addEventListener('click', function(e) {
			if (e.target.classList.contains('btn-close') || 
				e.target.classList.contains('close') || 
				e.target.closest('.btn-close') || 
				e.target.closest('.close')) {
				closeAllModals();
			}
			
			// Nếu click vào backdrop (khu vực ngoài modal)
			if (e.target.classList.contains('modal') && e.target.classList.contains('show')) {
				closeAllModals();
			}
		});
		
		// Xử lý nút Escape để đóng modal
		document.addEventListener('keydown', function(e) {
			if (e.key === 'Escape') {
				closeAllModals();
			}
		});
		
		// Hàm mở modal theo selector
		function openProductModal(selector) {
			var modalElement = document.querySelector(selector);
			if (!modalElement) return;
			
			// Đóng modal hiện tại trước khi mở cái mới
			closeAllModals();
			
			// Lưu trạng thái ban đầu
			currentOpenModal = modalElement;
			
			// Hiển thị modal
			modalElement.style.display = 'block';
			setTimeout(function() {
				modalElement.classList.add('show');
				document.body.classList.add('modal-open');
				document.body.style.overflow = 'hidden';
				
				// Tạo backdrop thủ công
				var backdrop = document.createElement('div');
				backdrop.className = 'modal-backdrop fade show custom-backdrop';
				document.body.appendChild(backdrop);
			}, 10);
		}
		
		// Hàm đóng tất cả các modal và dọn dẹp
		function closeAllModals() {
			// Đóng tất cả các modal
			var modals = document.querySelectorAll('.modal');
			modals.forEach(function(modal) {
				modal.classList.remove('show');
				modal.style.display = 'none';
				modal.setAttribute('aria-hidden', 'true');
				modal.removeAttribute('aria-modal');
				modal.removeAttribute('role');
			});
			
			// Xóa tất cả backdrop
			var backdrops = document.querySelectorAll('.modal-backdrop, .custom-backdrop');
			backdrops.forEach(function(backdrop) {
				if (backdrop && backdrop.parentNode) {
					backdrop.parentNode.removeChild(backdrop);
				}
			});
			
			// Khôi phục trạng thái body
			document.body.className = originalBodyClasses;
			document.body.style.cssText = originalBodyStyle;
			
			// Đảm bảo khôi phục scroll và các thuộc tính khác
			document.body.style.overflow = '';
			document.body.style.paddingRight = '';
			document.body.classList.remove('modal-open');
			
			// Xóa tham chiếu modal hiện tại
			currentOpenModal = null;
			
			// Giải phóng bộ nhớ và refresh DOM
			setTimeout(function() {
				// Force redraw DOM
				document.body.style.display = 'none';
				// Trick để force browser reflow
				void document.body.offsetHeight;
				document.body.style.display = '';
				
				// Đảm bảo có thể tương tác
				document.documentElement.style.pointerEvents = 'auto';
				document.body.style.pointerEvents = 'auto';
			}, 100);
		}
		
		// Override lại các hàm Bootstrap modal để đảm bảo an toàn
		if (typeof bootstrap !== 'undefined' && bootstrap.Modal) {
			// Lưu trữ hàm gốc
			var originalModalHide = bootstrap.Modal.prototype.hide;
			
			// Override hàm hide
			bootstrap.Modal.prototype.hide = function() {
				var result = originalModalHide.apply(this, arguments);
				// Đảm bảo dọn dẹp sau khi modal đóng
				setTimeout(closeAllModals, 300);
				return result;
			};
		}

		// Đảm bảo các hình ảnh sản phẩm cùng kích thước
		var productThumbnails = document.querySelectorAll('.product-thumbnail');
		if (productThumbnails.length > 0) {
			productThumbnails.forEach(function(img) {
				img.style.height = img.offsetWidth + 'px';
				img.style.objectFit = 'cover';
			});

			// Cập nhật kích thước khi thay đổi cửa sổ
			window.addEventListener('resize', function() {
				productThumbnails.forEach(function(img) {
					img.style.height = img.offsetWidth + 'px';
				});
			});
		}
	};
	productModal();

})();