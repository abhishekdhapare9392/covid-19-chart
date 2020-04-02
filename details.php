<?php
include 'header.php';
?>

<section class="no-margin-bottom">
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-6">
                <div class="block">
                    <div id="accordion"></div>
                    <!-- <div id="mhIndiaTable"></div> -->
                </div>
            </div>
            <div class="col-md-6">
                <div class="block text-center">
                    <h2 class="text-white">India</h2>
                </div>
                <div class="row">
                    <div class="col-md-3">
                        <div class="card text-center p-1 h-75">
                            <h4>Total <br />Confirmed</h4>
                            <h2 id="confirmedState" class="text-primary"></h2>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="card text-center p-1 h-75">
                            <h4>Total <br>Active</h4>
                            <h2 id="activeState" class="text-warning"></h2>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="card text-center p-1 h-75">
                            <h4>Total <br />Recovered</h4>
                            <h2 id="recoveredState" class="text-success"></h2>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="card text-center p-1 h-75">
                            <h4>Total <br />Deaths</h4>
                            <h2 id="deathsState" class="text-danger"></h2>
                        </div>
                    </div>
                </div>
                <div class="block text-center">
                    <div id="india_map" style="width: 100%; height: 100%;"></div>
                    <!-- <a href="/covid-19/details.php" class="btn btn-primary">Details</a> -->
                </div>
            </div>
        </div>
    </div>
</section>

<?php
include 'footer.php';
?>