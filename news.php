<?php
include 'header.php';
?>

<section class="no-padding-bottom">
    <div class="container-fluid">
        <div class="row pt-5">
            <div class="block w-100 text-left">
                <label for="country" class="text-white" style="font-size: 25px; font-weight: 600">Select Country</label>
                <select name="country" id="countryName" class="form-control">
                    <option value="globe">Global</option>
                </select>
            </div>
            <div class="block w-100">
                <div id="news_country" class="text-center pb-3"></div>
                <div id='news_card' class="row"></div>
            </div>
        </div>
    </div>
</section>

<?php
include 'footer.php';
?>