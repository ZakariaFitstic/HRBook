$(document).ready(function() {
    $('#Add').click(function(e) {
        e.preventDefault();
        e.stopPropagation();
        var nome = $('#nome').val();
        var cognome = $('#cognome').val();
        var data_nascita = $('#data_nascita').val();
        var contatto = $('#contatto').val();
        var skill = $('#skill').val();
        var formaz = $('#formazione').val();
        var data_scadenza = $('#data_scadenza').val();
        var nota = $('#nota').val();
        var data_nota = $('#data_nota').val();
        console.log(nome);
        $.ajax({
            url: "http://localhost:8080/api/candidate",
            method: "POST",
            data: {
                nome: nome,
                cognome: cognome,
                data_nascita: data_nascita,
                data_nota: data_nota,
                data_scadenza: data_scadenza,
                nota: nota,
                formaz: formaz,
                skill: skill,
                contatto: contatto
            },
            success: function() {
                alert("Done");
            },
            error: function() {
                alert("Failed!");
            }
        })
    });
})