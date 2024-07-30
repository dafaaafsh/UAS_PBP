$(document).ready(function() {
  // data
let transaksi = [
    { no:1,  tanggal:"2024-05-22", debit:5000000, kredit:0},
    { no:2,  tanggal:"2024-06-21", debit:2800000, kredit:0},
    { no:3,  tanggal:"2024-07-02", debit:0, kredit:2300000},
    { no:4,  tanggal:"2024-07-15", debit:800000, kredit:0},
    { no:5,  tanggal:"2024-08-20", debit:500000, kredit:0},
    { no:6,  tanggal:"2024-08-25", debit:0, kredit:1200000},
    { no:7,  tanggal:"2024-09-10", debit:2000000, kredit:0},
];
let noTransaksi = 8
let saldo = 0
  // fungsi muncul tabel
function populateTransaksiTable() {
    const tableBody = $("#transaksiTableBody");
    tableBody.empty();
    saldo = 0
    transaksi.forEach(transaksi => {
        saldo = saldo + transaksi.debit - transaksi.kredit
        tableBody.append(`
            <tr>
            <td>${transaksi.no}</td>
            <td>${transaksi.tanggal}</td>
            <td>Rp. ${transaksi.debit}</td>
            <td>Rp. ${transaksi.kredit}</td>
            <td>Rp. ${saldo}</td>
            </tr>
            `);
        });
        pilihanData();
        pilihanData1();
        populateTransaksiGraph();
}
  // munculkan tabel
populateTransaksiTable();


function populateTransaksiGraph() {

    let dataGrap = []
let dataGrap1 = []
let saldoTetap = 0
for (let index = 0; index < transaksi.length; index++) {
    saldo = transaksi[index].debit - transaksi[index].kredit;
    dataGrap[index] = transaksi[index].tanggal;
    dataGrap1[index] = saldoTetap + saldo;
    saldoTetap = dataGrap1[index];
}
console.log(dataGrap);
console.log(dataGrap1);

    if (window.myChart instanceof Chart) {
        window.myChart.destroy();
    }

    let ctx = document.getElementById('myChart')

    window.myChart = new Chart(ctx, {
        type: 'line',
        data: {
        labels: dataGrap,
        datasets: [{
            data: dataGrap1,
            lineTension: 0,
            backgroundColor: 'transparent',
            borderColor: '#007bff',
            borderWidth: 3,
            pointBackgroundColor: '#007bff'
        }]
        },
        options: {
        plugins: {
            legend: {
            display: false
            },
            tooltip: {
            boxPadding: 3
            }
        }
        }
    })
}


  // kirim form
$("#addTransaksiForm").submit(function(e) {
    
    let jenis = ''
    let newTransaksi = {};

    e.preventDefault();
    const selectedValue = $('#jenis').find('option:selected').val();

    switch (parseInt(selectedValue)) {
        case 1:
            jenis = 'Debit'
            newTransaksi = {
                no: noTransaksi,
                tanggal: $("#tanggal").val(),
                debit: parseInt($("#cash").val()),
                kredit: 0
            };
            break;
        case 2:
            jenis = 'Kredit'
            newTransaksi = {
                no: noTransaksi,
                tanggal: $("#tanggal").val(),
                debit: 0,
                kredit: parseInt($("#cash").val())
            };
            break;
        default:
            jenis = 'kesalahan'
            break;
    }

    noTransaksi++;

    transaksi.push(newTransaksi);
    populateTransaksiTable();
    pilihanData()
    $("#addTransaksiModal").modal("hide");
    this.reset();
});

function pilihanData() {
    const selectData = $("#pilihData")
    no = 0
    selectData.empty()
    selectData.append(`
        <option value = 'pilih' selected>pilih transaksi</option>
        `)
    transaksi.forEach(transaksi => {
        selectData.append(`
            <option value=${no}>transaksi no. ${transaksi.no}</option>
            `)
        no++
    });
}

function pilihanData1() {
    const selectData = $("#pilihData1")
    no = 0
    selectData.empty()
    selectData.append(`
        <option value = 'pilih' selected>pilih transaksi</option>
        `)
    transaksi.forEach(transaksi => {
        selectData.append(`
            <option value=${no}>transaksi no. ${transaksi.no}</option>
            `)
        no++
    });
}

//edit data
$('#cek').click(function (e) {
    e.preventDefault();
    const selectedValue = $('#pilihData').find('option:selected').val();

    if (selectedValue != 'pilih') {
        console.log(transaksi[selectedValue]);
        no = transaksi[selectedValue].no
        date = transaksi[selectedValue].tanggal
        deb = transaksi[selectedValue].debit
        kre = transaksi[selectedValue].kredit
        cash = deb + kre
        console.log(cash);

        const data = $('#data')

        if (deb != 0) {
            data.empty()
            data.append(`
                <div class="mb-4">
                    <label for="data-bs-theme" class="form-label">Tanggal</label>
                    <input type="date" value="${date}" class="form-control" id="tanggal1" aria-describedby="data-bs-theme-value" required>
                </div>
                <div class="mb-4">
                    <label for="data-bs-theme" class="form-label">Jenis Transaksi</label>
                    <select class="form-select" id="jenis1" aria-label="Default select example" required>
                        <option value="1" selected>Debit</option>
                        <option value="2">Kredit</option>
                    </select>
                </div>
                <label for="data-bs-theme" class="form-label">Total transaksi</label>
                <div class="row mb-4">
                    <label for="colFormLabel" class="col-sm-1 col-form-label">Rp.</label>
                    <div class="col-sm-5">
                    <input type="number" value="${cash}" step="100000" class="form-control" id="cash1" placeholder="0" required>
                    </div>
                    <div class="form-text">Masukkan total transaksi</div>
                </div>
                `)
        }
        
        if (kre != 0){
            data.empty()
            data.append(`
                <div class="mb-4">
                    <label for="data-bs-theme" class="form-label">Tanggal</label>
                    <input type="date" value="${date}" class="form-control" id="tanggal1" aria-describedby="data-bs-theme-value" required>
                </div>
                <div class="mb-4">
                    <label for="data-bs-theme" class="form-label">Jenis Transaksi</label>
                    <select class="form-select" id="jenis1" aria-label="Default select example" required>
                        <option value="1">Debit</option>
                        <option value="2" selected>Kredit</option>
                    </select>
                </div>
                <label for="data-bs-theme" class="form-label">Total transaksi</label>
                <div class="row mb-4">
                    <label for="colFormLabel" class="col-sm-1 col-form-label">Rp.</label>
                    <div class="col-sm-5">
                    <input type="number" value="${cash}" step="100000" class="form-control" id="cash1" placeholder="0" required>
                    </div>
                    <div class="form-text">Masukkan total transaksi</div>
                </div>
                `)
        }
        console.log(data);

    } else {
        alert('belum ada data yang dipilih')    
    }

}
)

//kirim edit data
$('#konfirmasi').click(function(e) {
    e.preventDefault();
    const selectedValue = $('#pilihData').find('option:selected').val();
    const selectedJenis = $('#jenis1').find('option:selected').val();

    console.log(parseInt(selectedJenis));

    if (parseInt(selectedJenis) == 1) {
        transaksi[selectedValue].tanggal = $('#tanggal1').val()
        transaksi[selectedValue].debit = parseInt($('#cash1').val())
        transaksi[selectedValue].kredit = 0
    }
    if (parseInt(selectedJenis) == 2) {
        transaksi[selectedValue].tanggal = $('#tanggal1').val()
        transaksi[selectedValue].kredit = parseInt($('#cash1').val())
        transaksi[selectedValue].debit = 0
    }

    populateTransaksiTable();
    $("#editTransaksiModal").modal("hide");
})


//hapus data
$('#hapusData').click(function (e) {
    e.preventDefault();
    const selectedValue = $('#pilihData1').find('option:selected').val();
    console.log(selectedValue);

    if (selectedValue != 'pilih') {
        const filter = transaksi.filter(function (letter) {
            return letter !== transaksi[selectedValue]
        })
        
        transaksi = filter
    
        populateTransaksiTable();
        console.log(transaksi);
        
        $("#deleteTransaksiModal").modal("hide");
    }else{
        alert('pilih data terlebih dahulu')
    }


}

)


  



})

