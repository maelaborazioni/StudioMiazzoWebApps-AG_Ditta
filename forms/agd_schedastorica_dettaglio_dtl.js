/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"E3DCD632-E0E1-4E61-802C-4F15D841C456",variableType:4}
 */
var _idDittaSchedaStorica = -1;

/**
 * Aggiorna i campi dopo la selezione della categoria
 * 
 * @param {JSRecord} _rec
 *
 *
 * @properties={typeid:24,uuid:"6FD5568A-E1C9-4FE2-8D04-C32A692EEF70"}
 */
function AggiornaDettaglioCategoria(_rec)
{
	
}

/**
 * Filtra le categorie selezionabili per la ditta 
 * 
 * @param {JSFoundset} _fs
 *
 *
 * @properties={typeid:24,uuid:"E411371D-6154-4DA4-A76F-19AEB8B62700"}
 */
function FiltraDettaglioCategoria(_fs)
{
	_fs.addFoundSetFilterParam('idditta','=',forms.agd_header_dtl.idditta);
	_fs.addFoundSetFilterParam('iddittaschedastorica','=',_idDittaSchedaStorica);
	
	return _fs;
}