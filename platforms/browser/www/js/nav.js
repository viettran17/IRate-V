$(window).on("load", function() {
    home()
});
$(document).ready(function() {
    $('#home').on('click', function() {
        $('#listrest').empty()
        home()
    })
    $(document).on('click', '#DeleteRes', function() {
        const rateid = $(this).attr("rateId")
        const result = DeleteRes(Number(rateid))
        result.onsuccess = function() {
            navigator.notification.beep(1);
            navigator.vibrate(100)
            $('#listrest').empty()
            home()
        }
        result.onerror = function() {
            alert("Failed to delete")
        }
    })
    $(document).on('click', '#GetDetailsRes', function() {
        const rateId = $(this).attr("rateId")
        const result = GetDetailsRes(rateId)
        result.onsuccess = function(event) {
            $(location).attr('href', "#detail")
            const Restaurant_Detail = event.target.result
            const html = `
            <div class="modal-dialog" role="document">
                <div class="">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">${Restaurant_Detail.Restaurant_Name}</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <h4 class="card-title">${Restaurant_Detail.Restaurant_Name}</h4>
                    <p class="card-text">${Restaurant_Detail.Restaurant_Type}</p>

                </div>
                <div class="modal-footer">
                    <button type="submit" class="btn btn-secondary" data-dismiss="modal" href="#homepage">Close</button>
                </div>
                </div>
            </div>
            `
            $('#detail').empty().append(html)
        }
    })
})