/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"F39CADF2-0C6A-4D30-806F-111E3A741F7D",variableType:4}
 */
var soloFesteNazionali = 0;

/**
 * Handle record selected.
 *
 * @param {JSEvent} event the event that triggered the action
 * @param _form
 *
 * @private
 *
 * @properties={typeid:24,uuid:"C9835DFB-DEA5-4916-B062-7EB04D5D6A7C"}
 */
function onRecordSelection(event, _form) 
{
	_super.onRecordSelection(event, _form);
	
	if(ditte_calendario_to_e2tabtipofestivita && ditte_calendario_to_e2tabtipofestivita.codice === globals.codACCANTONATA)
	{
		elements.data_rateo_tabless.tabIndex = 'rateo_tab';
	}
	else if(ditte_calendario_to_e2tabtipofestivita && ditte_calendario_to_e2tabtipofestivita.codice === globals.codSPOSTATA)
	{
		// TODO e se fosse normale?
		elements.data_rateo_tabless.tabIndex = 'data_tab';
	}
}

/**
 * @param {JSRecord} _rec
 *
 * @properties={typeid:24,uuid:"E81EDD21-C221-4797-8472-1EACC7365968"}
 */
function AggiornaFestivita(_rec)
{
	idfestenazionali = _rec['idfestenazionali'];
	descrizione = _rec['descrizione'];
}

/**
 * 
 * @param {JSRecord} _rec
 *
 * @properties={typeid:24,uuid:"9EA96B3F-A4AA-402F-BE18-86FDBA9D4CF6"}
 */
function AggiornaTipoFestivita(_rec)
{
	idtabtipofestivita = _rec['idtabtipofestivita'];
}

/**
 * @param {JSFoundset} _fs
 *
 * @properties={typeid:24,uuid:"60F64D19-41CA-4C4F-B989-6E0558AE2ADE"}
 */
function FiltraDitta(_fs)
{
	_fs.addFoundSetFilterParam('idditta','=',forms.agd_header_dtl.idditta);
	return _fs;
}

/**
 * @param {JSFoundset} _fs
 *
 * @properties={typeid:24,uuid:"068CFA94-3695-4717-B244-42920C065EA8"}
 */
function FiltraFestivitaDitta(_fs)
{
	if(soloFesteNazionali)
	   _fs.addFoundSetFilterParam('paese','=',"ITA");
	
	return _fs;
	
}


