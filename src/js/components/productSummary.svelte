<script>
    import {getProductDiscount} from "../utils.mjs";
    let {product} = $props();
</script>

<li class="product-card">
    <a href="../product_pages/index.html?product={product.Id}">
        <p class="discount-text">-{getProductDiscount(product)}%</p>
        <img
            src={product.Images.PrimaryMedium}
            alt={product.Name}/>
        <h3 class="card__brand">{product.Brand.Name}</h3>
        <h2 class="card__name">{product.Name}</h2>
        <p class="product-card__price">{product.FinalPrice}</p>
    </a>
</li>
