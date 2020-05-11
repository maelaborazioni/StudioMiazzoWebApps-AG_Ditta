/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"4EF9EA29-AB2F-4DEF-B3C5-7B5E481A8CDA"}
 */
var ftrGESTITE = '';

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"ABBF4AF7-BCFB-4C2C-A820-A614FC66B87B"}
 */
var lkpDITTA = 'AG_Lkp_Ditta';

/**
 * @properties={typeid:35,uuid:"C2ECB857-1621-4F1B-A2FC-E721A691BF14",variableType:-4}
 */
var TIPO_LIQUIDAZIONE = { annoprecedente : 1, sinoal : 0 };

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 * @param {String} formToDisplay
 * 
 * @properties={typeid:24,uuid:"3F99EC98-02D5-441D-9ACE-C76A83D1C1C7"}
 * @AllowToRunInFind
 */
function apriElencoRecapitiIndirizzoDitta(event, formToDisplay)
{
	/** @type {JSFoundSet<db:/ma_anagrafiche/ditte_indirizzi>} */
	var indirizziFoundset = forms[event.getFormName()].foundset;
	
	var currIdDitta = forms.agd_header_dtl.idditta;
	
	indirizziFoundset.find();
	indirizziFoundset.idditta = currIdDitta;
	indirizziFoundset.search();
	
	if(indirizziFoundset.ditte_indirizzi_to_ditte_recapiti && indirizziFoundset.ditte_indirizzi_to_ditte_recapiti.getSize() > 0)
	{
		indirizziFoundset.ditte_indirizzi_to_ditte_recapiti.sort('ditte_recapiti_to_tab_tipirecapito.ordine');
		globals.ma_utl_showFormInDialog(formToDisplay, 'Elenco recapiti', indirizziFoundset.ditte_indirizzi_to_ditte_recapiti, false, -1, 200);
	}
	else if(globals.getTipologiaDitta(indirizziFoundset.idditta) != globals.Tipologia.ESTERNA)
		globals.ma_utl_showFormInDialog(formToDisplay, 'Elenco recapiti');
	else
		globals.ma_utl_showInfoDialog('Nessun recapito associato all\'indirizzo selezionato', 'Info');
}

/**
 * @param {String} lkp_program
 * @param {String} program
 * @param {String} afterInsert
 * @param {String} addFilter
 *
 * @properties={typeid:24,uuid:"C06531B8-DF7A-4AC6-BD5B-8AD592B8E453"}
 */
function selezione_ditta(lkp_program,program,afterInsert,addFilter)
{	
	if (globals._filtroSuDitta) {

		var _form = globals.openProgram(lkp_program);
		lookup(globals._filtroSuDitta, _form);

	} else {
		var _event = new JSEvent;

		globals.svy_nav_showLookupWindow(_event, "", program, afterInsert,addFilter,
		             	                  null, null, "", true);
	}		
}

/**
 * @properties={typeid:24,uuid:"4D773FBD-2ACB-4226-83B1-785DA653EBD9"}
 */
function selezione_DA()
{
	if(globals.ma_utl_hasKey(globals.Key.GEST_ANAG_DITTA) 
		&& globals.getDitte().length == 0)
	{
		var frm = forms.agd_ditta;
		globals.ma_utl_showFormInDialog(frm.controller.getName(),'Inserisci una nuova anagrafica ditta');
		return;
	}
	
	var recSingolaDitta = getSingolaDitta(globals.Tipologia.STANDARD); 
	if (recSingolaDitta)
		ApriDA(recSingolaDitta)
	else if (globals._filtroSuDitta) {

		var _form = globals.openProgram('AGD_DatiAnagrafici');
		lookup(globals._filtroSuDitta, _form);

	} else {
		globals.svy_nav_showLookupWindow(new JSEvent, "currDitta", lkpDITTA,
                                         'ApriDA', 'filtraDittaControllateNonEsterna', null, null, '', true);
	}
}

/**
 * @properties={typeid:24,uuid:"FBE0A5DB-13ED-4F13-B16E-121F08715D30"}
 */
function selezione_DA_Esterna()
{
	var recSingolaDitta = getSingolaDitta(globals.Tipologia.ESTERNA); 
	if (recSingolaDitta)
		ApriDA_Esterna(recSingolaDitta)
		
	else if (globals._filtroSuDitta 
			&& globals.getTipologiaDitta(globals._filtroSuDitta) == globals.Tipologia.ESTERNA) {

		var _form = globals.openProgram('AGD_DatiAnagrafici_Esterna');
		lookup(globals._filtroSuDitta, _form);

	} else {
		globals.svy_nav_showLookupWindow(new JSEvent, "currDitta", lkpDITTA,
                                         'ApriDA_Esterna', 'filtraDittaEsterne', null, null, '', true);
	}
}

/**
 * @properties={typeid:24,uuid:"00596775-B2AF-436A-86B8-3FBD18C8FE55"}
 */
function selezione_DA_Fornitori()
{
	var recSingolaDitta = getSingolaDitta(globals.Tipologia.FORNITORE); 
	if (recSingolaDitta)
		ApriDA_Fornitori(recSingolaDitta)
	else
		globals.svy_nav_showLookupWindow(new JSEvent, "currDitta", lkpDITTA,
                                         'ApriDA_Fornitori', 'filtraDittaFornitori', null, null, '', true);
}

/**
 * @properties={typeid:24,uuid:"43AE44CD-5E98-4AA2-A306-44112313FF14"}
 */
function selezione_DA_Clienti()
{
	var recSingolaDitta = getSingolaDitta(globals.Tipologia.CLIENTE); 
	if (recSingolaDitta)
		ApriDA_Clienti(recSingolaDitta)
		
	else 		
		globals.svy_nav_showLookupWindow(new JSEvent, "currDitta", lkpDITTA,
                                         'ApriDA_Clienti', 'filtraDittaClienti', null, null, '', true);
}

/**
 * @properties={typeid:24,uuid:"258049B4-855F-4638-ADE1-033E1A49F0CD"}
 */
function selezione_CL()
{
	if(globals.ma_utl_hasKey(globals.Key.GEST_ANAG_DITTA) 
		&& globals.getDitte().length == 0)
	{
		var frm = forms.agd_ditta;
		globals.ma_utl_showFormInDialog(frm.controller.getName(),'Inserisci una nuova anagrafica ditta');
		return;
	}
	
	var recSingolaDitta = getSingolaDitta(globals.Tipologia.STANDARD); 
	if (recSingolaDitta)
		ApriCL(recSingolaDitta)
		
	else if (globals._filtroSuDitta) {

		var _form = globals.openProgram('AGD_Classificazioni');
		lookup(globals._filtroSuDitta, _form);

	} else {
		 
		globals.svy_nav_showLookupWindow(new JSEvent, "currDitta", lkpDITTA,
            'ApriCL', 'filtraDittaControllateNonEsterna', null, null, '', true);
	}
}

/**
 * @properties={typeid:24,uuid:"79F5778F-C545-4F76-9D3A-26DAFD683264"}
 */
function selezione_CL_Esterna()
{
	var recSingolaDitta = getSingolaDitta(globals.Tipologia.ESTERNA); 
	if (recSingolaDitta)
		ApriCL_Esterna(recSingolaDitta)
		
	else 
		globals.svy_nav_showLookupWindow(new JSEvent, "currDitta", lkpDITTA,
            'ApriCL_Esterna', 'filtraDittaEsterne', null, null, '', true);
}

/**
 * @properties={typeid:24,uuid:"8CB09664-FCF4-4594-BF47-13622C608869"}
 */
function selezione_CO()
{
	if(globals.ma_utl_hasKey(globals.Key.GEST_ANAG_DITTA) 
		&& globals.getDitte().length == 0)
	{
		var frm = forms.agd_ditta;
		globals.ma_utl_showFormInDialog(frm.controller.getName(),'Inserisci una nuova anagrafica ditta');
		return;
	}
	
	var recSingolaDitta = getSingolaDitta(globals.Tipologia.STANDARD); 
	if (recSingolaDitta)
		ApriCO(recSingolaDitta);
		
	else if (globals._filtroSuDitta) {

		var _form = globals.openProgram('AGD_Collocamento');
		lookup(globals._filtroSuDitta, _form);

	} else {
		var _event = new JSEvent;

		globals.svy_nav_showLookupWindow(_event, "", lkpDITTA, 'ApriCO', 'filtraDittaControllateNonEsterna',
		             	                  null, null, "", true);
	}
}

/**
 * @properties={typeid:24,uuid:"8DDDB103-065F-4B5B-B600-6CB3B7DD3B0D"}
 */
function selezione_CA()
{
	if(globals.ma_utl_hasKey(globals.Key.GEST_ANAG_DITTA) 
		&& globals.getDitte().length == 0)
	{
		var frm = forms.agd_ditta;
		globals.ma_utl_showFormInDialog(frm.controller.getName(),'Inserisci una nuova anagrafica ditta');
		return;
	}
	
	var recSingolaDitta = getSingolaDitta(globals.Tipologia.STANDARD); 
	if (recSingolaDitta)
		ApriCA(recSingolaDitta);
		
	else if (globals._filtroSuDitta) {

		var _form = globals.openProgram('AGD_CostituzioneAziendale');
		lookup(globals._filtroSuDitta, _form);

	} else {
		var _event = new JSEvent;

		globals.svy_nav_showLookupWindow(_event, "", lkpDITTA, 'ApriCA', 'filtraDittaControllateNonEsterna',
		             	                  null, null, "", true);
	}
}

/**
 * @properties={typeid:24,uuid:"8121FBAB-5249-4AC2-8FCA-72B64BA1DBEB"}
 */
function selezione_EB()
{
	if(globals.ma_utl_hasKey(globals.Key.GEST_ANAG_DITTA)
		&& globals.getDitte().length == 0)
	{
		var frm = forms.agd_ditta;
		globals.ma_utl_showFormInDialog(frm.controller.getName(),'Inserisci una nuova anagrafica ditta');
		return;
	}
	
	var recSingolaDitta = getSingolaDitta(globals.Tipologia.STANDARD); 
	if (recSingolaDitta)
		ApriEB(recSingolaDitta);
	
	else if (globals._filtroSuDitta) {

		var _form = globals.openProgram('AGD_EnteBilaterale');
		lookup(globals._filtroSuDitta, _form);

	} else {
		var _event = new JSEvent;

		globals.svy_nav_showLookupWindow(_event, "", lkpDITTA, 'ApriEB', 'filtraDittaControllateNonEsterna',
		             	                  null, null, "", true);
	}
}

/**
 *
 * @properties={typeid:24,uuid:"35232A0E-B354-48DA-90C6-E4F670C9E839"}
 */
function selezione_ENTI()
{
	if(globals.ma_utl_hasKey(globals.Key.GEST_ANAG_DITTA)
		&& globals.getDitte().length == 0)
	{
		var frm = forms.agd_ditta;
		globals.ma_utl_showFormInDialog(frm.controller.getName(),'Inserisci una nuova anagrafica ditta');
		return;
	}
	
	var recSingolaDitta = getSingolaDitta(globals.Tipologia.STANDARD); 
	if (recSingolaDitta)
		ApriDE(recSingolaDitta);
		
	else if (globals._filtroSuDitta) {

		var _form = globals.openProgram('AGD_Enti');
		lookup(globals._filtroSuDitta, _form);

	} else {
		var _event = new JSEvent;

		globals.svy_nav_showLookupWindow(_event, "", lkpDITTA, 'ApriDE', 'filtraDittaControllateNonEsterna',
		             	                  null, null, "", true);
	}
}

/**
 * @properties={typeid:24,uuid:"6C66A700-5CB9-478E-A43F-6A378B622201"}
 */
function selezione_INAIL()
{
	if(globals.ma_utl_hasKey(globals.Key.GEST_ANAG_DITTA)
		&& globals.getDitte().length == 0)
	{
		var frm = forms.agd_ditta;
		globals.ma_utl_showFormInDialog(frm.controller.getName(),'Inserisci una nuova anagrafica ditta');
		return;
	}
	
	var recSingolaDitta = getSingolaDitta(globals.Tipologia.STANDARD); 
	if (recSingolaDitta)
		ApriINAIL(recSingolaDitta);
		
	else if (globals._filtroSuDitta) {

		var _form = globals.openProgram('AGD_Inail');
		lookup(globals._filtroSuDitta, _form);

	} else {
		var _event = new JSEvent;

		globals.svy_nav_showLookupWindow(_event, "", lkpDITTA, 'ApriINAIL', 'filtraDittaControllateNonEsterna',
		             	                  null, null, "", true);
	}
}

/**
 * @properties={typeid:24,uuid:"BEDC1BF6-B355-4B98-9BC4-25DEF3F84253"}
 */
function selezione_INPS()
{
	if(globals.ma_utl_hasKey(globals.Key.GEST_ANAG_DITTA)
		&& globals.getDitte().length == 0)
	{
		var frm = forms.agd_ditta;
		globals.ma_utl_showFormInDialog(frm.controller.getName(),'Inserisci una nuova anagrafica ditta');
		return;
	}
	
	var recSingolaDitta = getSingolaDitta(globals.Tipologia.STANDARD); 
	if (recSingolaDitta)
		ApriINPS(recSingolaDitta);
		
	else if (globals._filtroSuDitta) {

		var _form = globals.openProgram('AGD_Inps');
		lookup(globals._filtroSuDitta, _form);

	} else {
		var _event = new JSEvent;

		globals.svy_nav_showLookupWindow(_event, "", lkpDITTA, 'ApriINPS', 'filtraDittaControllateNonEsterna',
		             	                  null, null, "", true);
	}
}

/**
 * @properties={typeid:24,uuid:"15DC80A9-7A4E-4001-BECF-EBABAFAB53B3"}
 */
function selezione_PS()
{
	if(globals.ma_utl_hasKey(globals.Key.GEST_ANAG_DITTA)
		&& globals.getDitte().length == 0)
	{
		var frm = forms.agd_ditta;
		globals.ma_utl_showFormInDialog(frm.controller.getName(),'Inserisci una nuova anagrafica ditta');
		return;
	}
	
	var recSingolaDitta = getSingolaDitta(globals.Tipologia.STANDARD); 
	if (recSingolaDitta)
		ApriPS(recSingolaDitta);
	
	else if (globals._filtroSuDitta) {

		var _form = globals.openProgram('AGD_Presenze');
		lookup(globals._filtroSuDitta, _form);

	} else {
		var _event = new JSEvent;

		globals.svy_nav_showLookupWindow(_event, "", lkpDITTA, 'ApriPS', 'filtraDittaControllateNonEsterna',
		             	                  null, null, "", true);
	}
}

/**
 * @properties={typeid:24,uuid:"EF95377D-451C-4C3F-9B9E-180C7C74EF4D"}
 */
function selezione_PR()
{
	if(globals.ma_utl_hasKey(globals.Key.GEST_ANAG_DITTA)
		&& globals.getDitte().length == 0)
	{
		var frm = forms.agd_ditta;
		globals.ma_utl_showFormInDialog(frm.controller.getName(),'Inserisci una nuova anagrafica ditta');
		return;
	}
	
	var recSingolaDitta = getSingolaDitta(globals.Tipologia.STANDARD); 
	if (recSingolaDitta)
		ApriPR(recSingolaDitta);
		
	else if (globals._filtroSuDitta) {

		var _form = globals.openProgram('AGD_Privacy');
		lookup(globals._filtroSuDitta, _form);

	} else {
		var _event = new JSEvent;

		globals.svy_nav_showLookupWindow(_event, "", lkpDITTA, 'ApriPR', 'filtraDittaStandard',
		             	                  null, null, "", true);
	}
}

/**
 * @properties={typeid:24,uuid:"4DAED984-9EF0-4377-8E8E-1F67C5D87507"}
 */
function selezione_SEC()
{
	if(globals.ma_utl_hasKey(globals.Key.GEST_ANAG_DITTA)
		&& globals.getDitte().length == 0)
	{
		var frm = forms.agd_ditta;
		globals.ma_utl_showFormInDialog(frm.controller.getName(),'Inserisci una nuova anagrafica ditta');
		return;
	}
	
	var recSingolaDitta = getSingolaDitta(globals.Tipologia.STANDARD); 
	if (recSingolaDitta)
		ApriSEC(recSingolaDitta);
		
	else if (globals._filtroSuDitta) {

		var _form = globals.openProgram('AGD_Sicurezza');
		lookup(globals._filtroSuDitta, _form);

	} else {
		var _event = new JSEvent;

		globals.svy_nav_showLookupWindow(_event, "", lkpDITTA, 'ApriSEC', 'filtraDittaStandard',
		             	                  null, null, "", true);
	}
	
}

/**
 * @properties={typeid:24,uuid:"4913CAE4-27D3-43DB-B196-16578A682235"}
 */
function selezione_DR()
{
	if(globals.ma_utl_hasKey(globals.Key.GEST_ANAG_DITTA)
		&& globals.getDitte().length == 0)
	{
		var frm = forms.agd_ditta;
		globals.ma_utl_showFormInDialog(frm.controller.getName(),'Inserisci una nuova anagrafica ditta');
		return;
	}
	
	if (globals._filtroSuDitta) 
		ApriDR(null)
    else {
		var _event = new JSEvent;

		globals.svy_nav_showLookupWindow(_event, "", lkpDITTA, 'ApriDR', 'filtraDittaStandard',
		             	                  null, null, "", true);
	}
}

/**
 * @properties={typeid:24,uuid:"54008D36-8BC0-44C3-B338-A87163AFB74C"}
 */
function selezione_SDL()
{
	if(globals.ma_utl_hasKey(globals.Key.GEST_ANAG_DITTA)
		&& globals.getDitte().length == 0)
	{
		var frm = forms.agd_ditta;
		globals.ma_utl_showFormInDialog(frm.controller.getName(),'Inserisci una nuova anagrafica ditta');
		return;
	}
	
	var recSingolaDitta = getSingolaDitta(globals.Tipologia.STANDARD); 
	if (recSingolaDitta)
		ApriSDL(recSingolaDitta);
	
	else if (globals._filtroSuDitta) {

		var _form = globals.openProgram('AGD_SediDiLavoro');
		lookup(globals._filtroSuDitta, _form);

	} else {
		var _event = new JSEvent;

		globals.svy_nav_showLookupWindow(_event, "", lkpDITTA, 'ApriSDL', 'filtraDittaControllateNonEsterna',
		             	                  null, null, "", true);
	}
}

/**
 * @properties={typeid:24,uuid:"027FAA7B-2B1F-416A-89D3-88C6BE3B607F"}
 */
function selezione_SS()
{
	if(globals.ma_utl_hasKey(globals.Key.GEST_ANAG_DITTA)
		&& globals.getDitte().length == 0)
	{
		var frm = forms.agd_ditta;
		globals.ma_utl_showFormInDialog(frm.controller.getName(),'Inserisci una nuova anagrafica ditta');
		return;
	}
	
	var recSingolaDitta = getSingolaDitta(globals.Tipologia.STANDARD); 
	if (recSingolaDitta)
		ApriSS(recSingolaDitta);
		
	else if (globals._filtroSuDitta) {

		var _form = globals.openProgram('AGD_SchedaStorica');
		lookup(globals._filtroSuDitta, _form);

	} else {
		var _event = new JSEvent;

		globals.svy_nav_showLookupWindow(_event, "", lkpDITTA, 'ApriSS', 'filtraDittaStandard',
		             	                  null, null, "", true);
	}
}

/**
 * @properties={typeid:24,uuid:"357765FF-F025-435C-882A-BF46C9A0F7EF"}
 */
function selezione_SS_Esterna()
{
	var recSingolaDitta = getSingolaDitta(globals.Tipologia.ESTERNA); 
	if (recSingolaDitta)
		ApriSS_Esterna(recSingolaDitta);
		
	else if (globals._filtroSuDitta 
			&& globals.getTipologiaDitta(globals._filtroSuDitta) == globals.Tipologia.ESTERNA) {

		var _form = globals.openProgram('AGD_SchedaStorica_Esterna');
		lookup(globals._filtroSuDitta, _form);

	} else {
		var _event = new JSEvent;

		globals.svy_nav_showLookupWindow(_event, "", lkpDITTA, 'ApriSS_Esterna', 'filtraDittaEsterna',
		             	                  null, null, "", true);
	}
}

/**
 * @properties={typeid:24,uuid:"A57075C9-BD73-49ED-B22E-DCE8D837F0DB"}
 */
function selezione_TU()
{
	if(globals.ma_utl_hasKey(globals.Key.GEST_ANAG_DITTA)
		&& globals.getDitte().length == 0)
	{
		var frm = forms.agd_ditta;
		globals.ma_utl_showFormInDialog(frm.controller.getName(),'Inserisci una nuova anagrafica ditta');
		return;
	}
	
	var recSingolaDitta = getSingolaDitta(globals.Tipologia.STANDARD); 
	if (recSingolaDitta)
		ApriTU(recSingolaDitta);
		
	else if (globals._filtroSuDitta) {

		var _form = globals.openProgram('AGD_Turni');
		lookup(globals._filtroSuDitta, _form);

	} else {
		var _event = new JSEvent;

		globals.svy_nav_showLookupWindow(_event, "", lkpDITTA, 'ApriTU', 'filtraDittaControllateNonEsterna',
		             	                  null, null, "", true);
	}
}

/**
 * 
 * @param {JSRecord} _rec
 *
 * @properties={typeid:24,uuid:"1D569590-D2B7-4DAD-B760-C499128DA0BC"}
 *
 */
function ApriDA(_rec)
{
	if (_rec)
	{
		var _program = 'AGD_DatiAnagrafici';
		var _filter = new Object();
		_filter.filter_name = 'ftr_idditta';
		_filter.filter_field_name = 'idditta';
		_filter.filter_operator = 'IN';
		
		_filter.filter_value = globals.getDitteControllateNonEsterne();
		
		var _progObj = globals.nav.program[_program];
		_progObj.filter = [_filter]; 
		_progObj.foundset = null;
		
		var _form = globals.openProgram(_program);
		lookup(_rec['idditta'], _form);
   	}
}

/**
 * 
 * @param {JSRecord} _rec
 *
 * @properties={typeid:24,uuid:"F7506D9E-7927-4E10-8FF1-9FB0EDD2297B"}
 *
 */
function ApriDA_Esterna(_rec)
{
	if (_rec)
	{
		var _program = 'AGD_DatiAnagrafici_Esterna';
		var _filter = new Object();
		_filter.filter_name = 'ftr_idditta';
		_filter.filter_field_name = 'idditta';
		_filter.filter_operator = 'IN';
		_filter.filter_value = globals.getDitteEsterne();
		
		var _progObj = globals.nav.program[_program];
		_progObj.filter = [_filter]; 
		_progObj.foundset = null;
		
		var _form = globals.openProgram(_program);
		lookup(_rec['idditta'], _form);
   	}
}

/**
 * 
 * @param {JSRecord} _rec
 *
 * @properties={typeid:24,uuid:"B26E04F1-C207-4D9C-961F-F1E26CA054E6"}
 *
 */
function ApriDA_Fornitori(_rec)
{
	if (_rec)
	{
		var _program = 'AGD_DatiAnagrafici_Fornitori';
		var _filter = new Object();
		_filter.filter_name = 'ftr_idditta';
		_filter.filter_field_name = 'idditta';
		_filter.filter_operator = 'IN';
		_filter.filter_value = globals.getDitteFornitori();
		
		var _progObj = globals.nav.program[_program];
		_progObj.filter = [_filter]; 
		_progObj.foundset = null;
		
		var _form = globals.openProgram(_program);
		lookup(_rec['idditta'], _form);
   	}
}

/**
 * 
 * @param {JSRecord} _rec
 *
 * @properties={typeid:24,uuid:"6B368CE7-CA96-43A8-A7FF-FCDEC4BC87AE"}
 *
 */
function ApriDA_Clienti(_rec)
{
	if (_rec)
	{
		var _program = 'AGD_DatiAnagrafici_Cliente';
		var _filter = new Object();
		_filter.filter_name = 'ftr_idditta';
		_filter.filter_field_name = 'idditta';
		_filter.filter_operator = 'IN';
		_filter.filter_value = globals.getDitteClienti();
		
		var _progObj = globals.nav.program[_program];
		_progObj.filter = [_filter]; 
		_progObj.foundset = null;
		
		var _form = globals.openProgram(_program);
		lookup(_rec['idditta'], _form);
   	}
}

/**
 * 
 * @param {JSRecord} _rec
 *
 *
 *
 * @properties={typeid:24,uuid:"A8E31126-4ECA-4C40-952A-9C96358A92C4"}
 */
function ApriDE(_rec)
{
	if (_rec)
	{
		var _program = 'AGD_Enti';
		var _filter = new Object();
		_filter.filter_name = 'ftr_idditta';
		_filter.filter_field_name = 'idditta';
		_filter.filter_operator = 'IN';
		_filter.filter_value = globals.getDitteControllateNonEsterne();
		
		var _progObj = globals.nav.program[_program];
		_progObj.filter = [_filter]; 
		_progObj.foundset = null;
		
		var _form = globals.openProgram(_program);
		lookup(_rec['idditta'], _form);
   	}
	
}

/**
 * 
 * @param {JSRecord} _rec
 *
 * @properties={typeid:24,uuid:"36A36AD2-410F-4E87-AA69-1CF421937FA8"}
 */
function ApriCL(_rec)
{
	if (_rec)
	{
		var _program = 'AGD_Classificazioni';
		var _filter = new Object();
		_filter.filter_name = 'ftr_idditta';
		_filter.filter_field_name = 'idditta';
		_filter.filter_operator = 'IN';
		_filter.filter_value = globals.getDitteControllateNonEsterne();
		
		var _progObj = globals.nav.program[_program];
		_progObj.filter = [_filter]; 
		_progObj.foundset = null;
		
		var _form = globals.openProgram(_program);
		lookup(_rec['idditta'], _form);
   	}
	
}

/**
 * 
 * @param {JSRecord} _rec
 *
 * @properties={typeid:24,uuid:"613C63E0-2200-420C-A90C-4BC51EE903E7"}
 */
function ApriCL_Esterna(_rec)
{
	if (_rec)
	{
		var _program = 'AGD_Classificazioni_Esterna';
		var _filter = new Object();
		_filter.filter_name = 'ftr_idditta';
		_filter.filter_field_name = 'idditta';
		_filter.filter_operator = 'IN';
		_filter.filter_value = globals.getDitteEsterne();
		
		var _progObj = globals.nav.program[_program];
		_progObj.filter = [_filter]; 
		_progObj.foundset = null;
		
		var _form = globals.openProgram(_program);
		lookup(_rec['idditta'], _form);
   	}
	
}

/**
 * 
 * @param {JSRecord} _rec
 *
 * @properties={typeid:24,uuid:"7D9B2377-9806-4C6B-A8DD-6D25D410B15E"}
 */
function ApriCO(_rec)
{
	if (_rec)
	{
		var _program = 'AGD_Collocamento';
		var _filter = new Object();
		_filter.filter_name = 'ftr_idditta';
		_filter.filter_field_name = 'idditta';
		_filter.filter_operator = 'IN';
		_filter.filter_value = globals.getDitteStandard();
		
		var _progObj = globals.nav.program[_program];
		_progObj.filter = [_filter]; 
		_progObj.foundset = null;
		
		var _form = globals.openProgram(_program);
		lookup(_rec['idditta'], _form);
   	}
	
}

/**
 * 
 * @param {JSRecord} _rec
 *
 * @properties={typeid:24,uuid:"71C22AB8-7BB0-4492-8C0F-5C0CF70C9C9E"}
 */
function ApriCA(_rec)
{
	if (_rec)
	{
		var _program = 'AGD_CostituzioneAziendale';
		var _filter = new Object();
		_filter.filter_name = 'ftr_idditta';
		_filter.filter_field_name = 'idditta';
		_filter.filter_operator = 'IN';
		_filter.filter_value = globals.getDitteControllateNonEsterne();
		
		var _progObj = globals.nav.program[_program];
		_progObj.filter = [_filter]; 
		_progObj.foundset = null;
		
		var _form = globals.openProgram(_program);
		lookup(_rec['idditta'], _form);
   	}
	
}

/**
 * 
 * @param {JSRecord} _rec
 *
 * @properties={typeid:24,uuid:"86AF4AF4-245C-4A1D-B577-410B13D2BDB4"}
 */
function ApriEB(_rec)
{
	if (_rec)
	{
		var _program = 'AGD_EnteBilaterale';
		var _filter = new Object();
		_filter.filter_name = 'ftr_idditta';
		_filter.filter_field_name = 'idditta';
		_filter.filter_operator = 'IN';
		_filter.filter_value = globals.getDitteStandard();
		
		var _progObj = globals.nav.program[_program];
		_progObj.filter = [_filter]; 
		_progObj.foundset = null;
		
		var _form = globals.openProgram(_program);
		lookup(_rec['idditta'], _form);
   	}
	
}

/**
 * 
 * @param {JSRecord} _rec
 *
 * @properties={typeid:24,uuid:"9FA2FEB5-D1F1-4FFF-B99A-98641FB214A6"}
 */
function ApriSS(_rec)
{
	if (_rec)
	{
		var _program = 'AGD_SchedaStorica';
		var _filter = new Object();
		_filter.filter_name = 'ftr_idditta';
		_filter.filter_field_name = 'idditta';
		_filter.filter_operator = 'IN';
		_filter.filter_value = globals.getDitteStandard();
		
		var _progObj = globals.nav.program[_program];
		_progObj.filter = [_filter]; 
		_progObj.foundset = null;
		
		var _form = globals.openProgram(_program);
		lookup(_rec['idditta'], _form);
   	}
	
}

/**
 * 
 * @param {JSRecord} _rec
 *
 * @properties={typeid:24,uuid:"8F15B78D-0664-4D68-A913-1084D3B8958E"}
 */
function ApriSS_Esterna(_rec)
{
	if (_rec)
	{
		var _program = 'AGD_SchedaStorica_Esterna';
		var _filter = new Object();
		_filter.filter_name = 'ftr_idditta';
		_filter.filter_field_name = 'idditta';
		_filter.filter_operator = 'IN';
		_filter.filter_value = globals.getDitteEsterne();
		
		var _progObj = globals.nav.program[_program];
		_progObj.filter = [_filter]; 
		_progObj.foundset = null;
		
		var _form = globals.openProgram(_program);
		lookup(_rec['idditta'], _form);
   	}
	
}

/**
 * 
 * @param {JSRecord} _rec
 *
 * @properties={typeid:24,uuid:"231B3C5C-DA60-425B-82B3-CA77C67FB45F"}
 */
function ApriINAIL(_rec)
{
	if (_rec)
	{
		var _program = 'AGD_Inail';
		var _filter = new Object();
		_filter.filter_name = 'ftr_idditta';
		_filter.filter_field_name = 'idditta';
		_filter.filter_operator = 'IN';
		_filter.filter_value = globals.getDitteControllateNonEsterne();
		
		var _progObj = globals.nav.program[_program];
		_progObj.filter = [_filter]; 
		_progObj.foundset = null;
		
		var _form = globals.openProgram(_program);
		lookup(_rec['idditta'], _form);
   	}
	
}

/**
 * 
 * @param {JSRecord} _rec
 *
 * @properties={typeid:24,uuid:"A99B46F1-2F56-4292-A1A4-39B82053CD06"}
 */
function ApriINPS(_rec)
{
	if (_rec)
	{
		var _program = 'AGD_Inps';
		var _filter = new Object();
		_filter.filter_name = 'ftr_idditta';
		_filter.filter_field_name = 'idditta';
		_filter.filter_operator = 'IN';
		_filter.filter_value = globals.getDitteControllateNonEsterne();
		
		var _progObj = globals.nav.program[_program];
		_progObj.filter = [_filter]; 
		_progObj.foundset = null;
		
		var _form = globals.openProgram(_program);
		lookup(_rec['idditta'], _form);
   	}
	
}

/**
 * 
 * @param {JSRecord} _rec
 *
 * @properties={typeid:24,uuid:"35AC3A57-DA10-4C9B-9421-7F750A26A3A9"}
 */
function ApriPS(_rec)
{
	if (_rec)
	{
		var _program = 'AGD_Presenze';
		var _filter = new Object();
		_filter.filter_name = 'ftr_idditta';
		_filter.filter_field_name = 'idditta';
		_filter.filter_operator = 'IN';
		_filter.filter_value = globals.getDitteControllateNonEsterne();
		
		var _progObj = globals.nav.program[_program];
		_progObj.filter = [_filter]; 
		_progObj.foundset = null;
		
		var _form = globals.openProgram(_program);
		lookup(_rec['idditta'], _form);
   	}
	
}

/**
 * 
 * @param {JSRecord} _rec
 *
 * @properties={typeid:24,uuid:"74FCC0C4-0895-4E62-A661-DA4946EB5CCA"}
 */
function ApriPR(_rec)
{
	if (_rec)
	{
		var _program = 'AGD_Privacy';
		var _filter = new Object();
		_filter.filter_name = 'ftr_idditta';
		_filter.filter_field_name = 'idditta';
		_filter.filter_operator = 'IN';
		_filter.filter_value = globals.getDitteStandard();
		
		var _progObj = globals.nav.program[_program];
		_progObj.filter = [_filter]; 
		_progObj.foundset = null;
		
		var _form = globals.openProgram(_program);
		lookup(_rec['idditta'], _form);
   	}
	
}

/**
 * 
 * @param {JSRecord} _rec
 *
 * @properties={typeid:24,uuid:"9E210F2B-DBEC-452B-9276-FFA60C5E564E"}
 */
function ApriSEC(_rec)
{
	if (_rec)
	{
		var _program = 'AGD_Sicurezza';
		var _filter = new Object();
		_filter.filter_name = 'ftr_idditta';
		_filter.filter_field_name = 'idditta';
		_filter.filter_operator = 'IN';
		_filter.filter_value = globals.getDitteStandard();
		
		var _progObj = globals.nav.program[_program];
		_progObj.filter = [_filter]; 
		_progObj.foundset = null;
		
		var _form = globals.openProgram(_program);
		lookup(_rec['idditta'], _form);
   	}
	
}

/**
 * 
 * @param {JSRecord} _rec
 *
 * @properties={typeid:24,uuid:"84977BD1-799B-4F53-BD47-820993AF6DC7"}
 */
function ApriDR(_rec)
{
	var _filter = new Object();
	_filter.filter_name = 'ftr_idditta';
	_filter.filter_field_name = 'idditta';
	_filter.filter_operator = '=';
	if(_rec)
		_filter.filter_value = _rec['idditta'];
	else
		_filter.filter_value = globals._filtroSuDitta;
	
	var _progObj = globals.nav.program['HR_DettaglioRetributivo'];
	_progObj.filter = [_filter]; 
	_progObj.foundset = null;
	
    globals.openProgram('HR_DettaglioRetributivo');
}

/**
 * 
 * @param {JSRecord} _rec
 *
 * @properties={typeid:24,uuid:"3D48CBE3-554A-47E7-8783-E7020B5E0595"}
 */
function ApriSDL(_rec)
{
	if (_rec)
	{
		var _program = 'AGD_SediDiLavoro';
		var _filter = new Object();
		_filter.filter_name = 'ftr_idditta';
		_filter.filter_field_name = 'idditta';
		_filter.filter_operator = 'IN';
		_filter.filter_value = globals.getDitteControllateNonEsterne();
		
		var _progObj = globals.nav.program[_program];
		_progObj.filter = [_filter]; 
		_progObj.foundset = null;
		
		var _form = globals.openProgram(_program);
		lookup(_rec['idditta'], _form);
   	}
	
}

/**
 * 
 * @param {JSRecord} _rec
 *
 * @properties={typeid:24,uuid:"66BE9D9F-DDEF-4E5B-9247-50BD7E1F2BDF"}
 */
function ApriTU(_rec)
{
	if (_rec)
	{
		var _program = 'AGD_Turni';
		var _filter = new Object();
		_filter.filter_name = 'ftr_idditta';
		_filter.filter_field_name = 'idditta';
		_filter.filter_operator = 'IN';
		_filter.filter_value = globals.getDitteStandard();
		
		var _progObj = globals.nav.program[_program];
		_progObj.filter = [_filter]; 
		_progObj.foundset = null;
		
		var _form = globals.openProgram(_program);
		lookup(_rec['idditta'], _form);
   	}
}

/**
 * @properties={typeid:24,uuid:"E32CB2E2-597C-49DC-B58D-C8191A85D4A3"}
 */
function filtraGestEpi2(_fs)
{
	_fs.addFoundSetFilterParam('gestitaepi2','=', 1);
	return _fs;
}

/**
 * Filtra le ditte di tipologia esterna
 * 
 * @param {JSFoundset} _fs
 *
 * @properties={typeid:24,uuid:"7149EF79-22B9-426F-8E40-1426FDBB02B3"}
 */
function filtraDittaEsterne(_fs)
{
	_fs.addFoundSetFilterParam('tipologia','=',1);
	return _fs;
}

/**
 * Filtra le ditte di tipologia esterna interinale
 * 
 * @param {JSFoundset} _fs
 *
 * @properties={typeid:24,uuid:"8A25874F-8DD8-4CE8-8207-71C211331385"}
 */
function filtraDittaInterinali(_fs)
{
	_fs.addFoundSetFilterParam('tipologia','=',2);
	return _fs;
}

/**
 * Filtra le ditte di tipologia standard
 * 
 * @param {JSFoundset} _fs
 *
 * @properties={typeid:24,uuid:"C639DC0F-8D78-459C-B4BA-078F8B02EDDC"}
 */
function filtraDittaStandard(_fs)
{
	_fs.addFoundSetFilterParam('tipologia','=',globals.Tipologia.STANDARD);
	return _fs;
}

/**
 * @param {JSFoundset} fs
 *
 * @properties={typeid:24,uuid:"0ED1ED4E-2B9E-4608-B14E-94D8C81161F3"}
 * @AllowToRunInFind
 */
function filterDitta(fs)
{
	var _arrDitteGestiteEpi2 = [];
	var _dsDitteGestiteEpi2 = databaseManager.getDataSetByQuery(globals.Server.MA_ANAGRAFICHE,'SELECT idditta FROM ditte_presenze WHERE Ore_GestioneEpi2 = 1',null,-1)
	    _arrDitteGestiteEpi2 = _dsDitteGestiteEpi2.getColumnAsArray(1);
		
	fs.removeFoundSetFilterParam('ftr_ditteGestiteEpi2');
	fs.addFoundSetFilterParam('idditta','IN',_arrDitteGestiteEpi2,'ftr_ditteGestiteEpi2');	
	
	return fs;
}

/**
 * Filtra le ditte controllate : standard, esterne ed interinali (utile per assegnazione commesse)
 * 
 * @param {JSFoundset} _fs
 *
 * @properties={typeid:24,uuid:"BDF11161-F43D-43E4-826B-F30CE0EE2799"}
 */
function filtraDittaControllate(_fs)
{
	_fs.addFoundSetFilterParam('tipologia','IN',[globals.Tipologia.STANDARD,globals.Tipologia.ESTERNA,globals.Tipologia.GESTITA_UTENTE]);
	return _fs;
}

/**
 * Filtra le ditte di tipologia fornitori studio
 * 
 * @param {JSFoundset} _fs
 *
 * @properties={typeid:24,uuid:"C94EAABD-BBCF-4EA9-B8BA-3B1378EE60B4"}
 */
function filtraDittaFornitori(_fs)
{
	_fs.addFoundSetFilterParam('tipologia','=',globals.Tipologia.FORNITORE);
	return _fs;
}

/**
 * Filtra le ditte di tipologia cliente (per commesse)
 * 
 * @param {JSFoundset} _fs
 *
 * @properties={typeid:24,uuid:"76D78D7D-1DB6-4A52-A769-5212E929276F"}
 */
function filtraDittaClienti(_fs)
{
	_fs.addFoundSetFilterParam('tipologia','=',globals.Tipologia.CLIENTE);
	return _fs;
}

/**
 * @param {JSFoundset} _fs
 *
 * @properties={typeid:24,uuid:"7E6BECB8-2EE2-46C1-BE3F-2F5CE3328D20"}
 */
function filtraDittaControllateNonGestiteStudio(_fs)
{
	_fs.addFoundSetFilterParam('tipologia','IN',[globals.Tipologia.ESTERNA,globals.Tipologia.GESTITA_UTENTE]);
	return _fs;
}

/**
 * @param {JSFoundset} _fs
 *
 * @properties={typeid:24,uuid:"EE9F5D1B-BDF3-4B5E-B3A9-22DC20F53D6C"}
 */
function filtraDittaControllateNonEsterna(_fs)
{
	_fs.addFoundSetFilterParam('tipologia','IN',[globals.Tipologia.STANDARD,globals.Tipologia.GESTITA_UTENTE]);
	return _fs;
}

/**
 * @param {JSFoundset} _fs
 *
 * @properties={typeid:24,uuid:"AE84F376-3D18-4DAF-8CF3-6AB803A52D6F"}
 */
function filtraDittaNonGestiteStudio(_fs)
{
	_fs.addFoundSetFilterParam('tipologia','IN',[globals.Tipologia.ESTERNA,globals.Tipologia.GESTITA_UTENTE,globals.Tipologia.FORNITORE,globals.Tipologia.CLIENTE]);
	return _fs;
}

/**
 * Filtra le ditte per le quale gestire le regole orarie
 * Sono le ditte normali più le ditte esterne con tipologia 'Esterni' 
 * (in pratica tutte tranne le interinali che seguono quelle della ditta legata)
 * 
 * @param {JSFoundSet<db:/ma_anagrafiche/ditte>} _fs
 *
 * @properties={typeid:24,uuid:"F06A00B7-7BE4-4B78-B397-0331223E33AE"}
 * @AllowToRunInFind
 */
function filtraDittaPerRegoleOrarie(_fs)
{
	if(_fs.find())
	{
		_fs.tipologia = 0;
		_fs.newRecord();
		_fs.tipologia = 1;
		_fs.ditte_to_ditte_legami.tipoesterni = 1;
		_fs.search();
	}
	
	return _fs;
}
/**
 * @param {JSRecord<db:/ma_anagrafiche/ditte_funzionipersone>} record
 *
 * @properties={typeid:24,uuid:"53EA5475-448F-4E86-91E9-3BAA7361483A"}
 * @AllowToRunInFind
 */
function validateFunzionePersona(record)
{
	var not_valid = false
	
	var _fs = record.foundset.duplicateFoundSet()
	if(_fs.find())
	{
		_fs.iddittafunzionepersona = '!=' + record.iddittafunzionepersona;
		
		if(record.ditte_funzionipersone_to_ditte_funzionipersonesedi && record.ditte_funzionipersone_to_ditte_funzionipersonesedi.getSize() > 0)
			_fs.ditte_funzionipersone_to_ditte_funzionipersonesedi.iddittasede = '^||=' + record.ditte_funzionipersone_to_ditte_funzionipersonesedi.iddittasede;		// null or...
		if(record.ditte_funzionipersone_to_ditte_funzionipersoneturni && record.ditte_funzionipersone_to_ditte_funzionipersoneturni.getSize() > 0)
			_fs.ditte_funzionipersone_to_ditte_funzionipersoneturni.iddittaturno = '^||=' + record.ditte_funzionipersone_to_ditte_funzionipersoneturni.iddittaturno;		// null or...
		
		_fs.idditta = record.idditta;
		_fs.codambito = record.codambito;
		_fs.codtipofunzione = record.codtipofunzione;
		_fs.datacessazione = '^||>=' + globals.formatForFind(globals.TODAY);
		_fs.datarevoca = '^||>=' + globals.formatForFind(globals.TODAY);
		
		not_valid = _fs.search(true) > 0;
	}
	
	if(not_valid)
		throw new Error('Il ruolo scelto è già ricoperto');
		
	return true
}

/**
 * @param {JSRecord<db:/ma_hr/privacy_dittaarchivio>} record
 * 
 * @properties={typeid:24,uuid:"E15CAFAF-6B0B-44FB-8B98-D99CBEC9F706"}
 * @AllowToRunInFind
 */
function validateArchivio(record)
{
	var not_valid = false
	
	var fs = record.foundset.duplicateFoundSet();//databaseManager.getFoundSet(record.getDataSource())
	if(fs && fs.find())
	{
		fs.idprivacydittaarchivio = '!=' + record.idprivacydittaarchivio;
		fs.idditta = record.idditta;
		fs.codice = record.codice;
		
		not_valid = fs.search(true) > 0
	}
	
	if(not_valid)
		throw 'L\'archivio inserito è già presente'
		
	if(!record['cartaceo'] && !record['informatico'])
		throw 'È necessario impostare almeno una tipologia di archivio'
		
	return true
}

/**
 * @properties={typeid:24,uuid:"DAFEB6A6-7ED0-4426-AB38-DF2A14F75D7A"}
 */
function disableFunzioni(datoreNominato)
{
	/**
	 * Disabilita il tab delle funzioni se il datore non è nominato
	 */
	var programName = 'AGD_Sicurezza';
	
	if(globals.nav.program === programName)
		globals.ma_utl_setProgramTabs(programName, datoreNominato, ['AGD_SI_Funzioni']);
}

/**
 * @properties={typeid:24,uuid:"530C4E92-04F0-46D9-B84A-BDBAB191F794"}
 */
function apriDettagliVociINAILDitta(event)
{
	var vociTariffaForm = forms.agd_inail_vocitariffa_dtl;
	globals.ma_utl_showFormInDialog(vociTariffaForm.controller.getName(), 'Dettagli voce tariffa', forms[event.getFormName()].foundset);
}

/**
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"E18ADB24-13F3-4DCF-94F3-4BCEC14AA919"}
 */
function apriSediDiLavoroINAILDitta(event)
{
	var sediLavoroForm = forms.agd_inail_sedi_tbl;
	globals.ma_utl_showFormInDialog(sediLavoroForm.controller.getName()
		                            ,'Sedi di lavoro associate'
									,forms.agd_inail_sedi_main.foundset.ditte_to_ditte_inailposizioni.ditte_inailposizioni_to_ditte_inailsedi
	                                );
}

/**
 * @properties={typeid:24,uuid:"4D6A40ED-039C-40D7-873A-66C2A89FC1EA"}
 */
function aggiungi_ditta()
{
	var frm = forms.agd_ditta;
	frm._tipologiaDitta = globals.Tipologia.STANDARD;
    globals.ma_utl_showFormInDialog(frm.controller.getName(),'Inserisci i dati della nuova ditta');	
}

/**
 * @properties={typeid:24,uuid:"2606AD52-F5B0-4664-A89A-88CDA0C2676B"}
 */
function aggiungi_ditta_esterna()
{
	var frm = forms.agd_ditta_esterna;
	frm._tipologiaDitta = globals.Tipologia.ESTERNA;
    globals.ma_utl_showFormInDialog(frm.controller.getName(),'Inserisci i dati della nuova ditta esterna');	
}

/**
 * @properties={typeid:24,uuid:"1A4E9C40-3B1E-4766-B39F-B24BD08DCEB3"}
 */
function aggiungi_ditta_cliente()
{
	var frm = forms.agd_ditta_cliente;
	frm._tipologiaDitta = globals.Tipologia.CLIENTE;
    globals.ma_utl_showFormInDialog(frm.controller.getName(),'Inserisci i dati della nuova ditta cliente');
}

/**
 * Apre i dati anagrafici della ditta di cui si sta visualizzando la giornaliera
 *
 * @param {Number} _itemInd
 * @param {Number} _parItem
 * @param {Boolean} _isSel
 * @param {String} _parMenTxt
 * @param {String} _menuTxt
 * @param {JSEvent} event
 * @param {Number} idditta
 * 
 * @properties={typeid:24,uuid:"6600126E-C692-4733-945A-BEC509BA2631"}
 */
function apriDatiAnagDitta(_itemInd, _parItem, _isSel, _parMenTxt, _menuTxt,event,idditta)
{
	var _filterDitta = new Object();
	_filterDitta.filter_field_name = 'idditta';
	_filterDitta.filter_operator = '=';
	_filterDitta.filter_value = idditta;
	
	var _progObj = globals.nav.program['AGD_DatiAnagrafici'];
	_progObj.filter = [_filterDitta];  
    _progObj.foundset = null;	

	/** @type {Array<Object>} */
	var _parArr = new Array();
		
	globals.openProgram('AGD_DatiAnagrafici',_parArr);
}

/**
 * Apre le sedi di lavoro della ditta di cui si sta visualizzando la giornaliera
 *
 * @param {Number} _itemInd
 * @param {Number} _parItem
 * @param {Boolean} _isSel
 * @param {String} _parMenTxt
 * @param {String} _menuTxt
 * @param {JSEvent} event
 * @param {Number} idditta
 * 
 * @properties={typeid:24,uuid:"32D6FAA2-D5DF-441C-988F-0034E9C0405D"}
 */
function apriSediLavoro(_itemInd, _parItem, _isSel, _parMenTxt, _menuTxt,event,idditta)
{
	var _filterDitta = new Object();
	_filterDitta.filter_field_name = 'idditta';
	_filterDitta.filter_operator = '=';
	_filterDitta.filter_value = idditta;
	
	var _progObj = globals.nav.program['AGD_SediDiLavoro'];
	_progObj.filter = [_filterDitta];  
    _progObj.foundset = null;	

	/** @type {Array<Object>} */
	var _parArr = new Array();
		
	globals.openProgram('AGD_SediDiLavoro',_parArr);
}

/**
 * Apre le classificazioni della ditta di cui si sta visualizzando la giornaliera
 * 
 * @param {Number} _itemInd
 * @param {Number} _parItem
 * @param {Boolean} _isSel
 * @param {String} _parMenTxt
 * @param {String} _menuTxt
 * @param {JSEvent} event
 * @param {Number} idditta
 * 
 * @properties={typeid:24,uuid:"3BF5B2AE-B229-4B0F-AC08-E2FCD9594F39"}
 */
function apriClassificazioniDitta(_itemInd, _parItem, _isSel, _parMenTxt, _menuTxt,event,idditta)
{
	var _filterDitta = new Object();
	_filterDitta.filter_field_name = 'idditta';
	_filterDitta.filter_operator = '=';
	_filterDitta.filter_value = idditta;
	
	var _progObj = globals.nav.program['AGD_Classificazioni'];
	_progObj.filter = [_filterDitta];  
    _progObj.foundset = null;	

	/** @type {Array<Object>} */
	var _parArr = new Array();
		
	globals.openProgram('AGD_Classificazioni',_parArr);
}

/**
 * Apre la gestione INAIL della ditta di cui si sta visualizzando la giornaliera
 * 
 * @param {Number} _itemInd
 * @param {Number} _parItem
 * @param {Boolean} _isSel
 * @param {String} _parMenTxt
 * @param {String} _menuTxt
 * @param {JSEvent} event
 * @param {Number} idditta
 *
 * @properties={typeid:24,uuid:"4D279266-011E-4F62-AF5C-4B0EDFFC4714"}
 */
function apriINAILDitta(_itemInd, _parItem, _isSel, _parMenTxt, _menuTxt,event,idditta)
{
	var _filterDitta = new Object();
	_filterDitta.filter_field_name = 'idditta';
	_filterDitta.filter_operator = '=';
	_filterDitta.filter_value = idditta;
	
	var _progObj = globals.nav.program['AGD_Inail'];
	_progObj.filter = [_filterDitta];  
    _progObj.foundset = null;	

	/** @type {Array<Object>} */
	var _parArr = new Array();
		
	globals.openProgram('AGD_Inail',_parArr);
}

/**
 * Apre la gestione INPS della ditta di cui si sta visualizzando la giornaliera
 * 
 * @param {Number} _itemInd
 * @param {Number} _parItem
 * @param {Boolean} _isSel
 * @param {String} _parMenTxt
 * @param {String} _menuTxt
 * @param {JSEvent} event
 * @param {Number} idditta
 *
 * @properties={typeid:24,uuid:"B5C66009-491A-4441-9686-4A9E563F58F2"}
 */
function apriINPSDitta(_itemInd, _parItem, _isSel, _parMenTxt, _menuTxt,event,idditta)
{
	var _filterDitta = new Object();
	_filterDitta.filter_field_name = 'idditta';
	_filterDitta.filter_operator = '=';
	_filterDitta.filter_value = idditta;
	
	var _progObj = globals.nav.program['AGD_Inps'];
	_progObj.filter = [_filterDitta];  
    _progObj.foundset = null;	

	/** @type {Array<Object>} */
	var _parArr = new Array();
		
	globals.openProgram('AGD_Inps',_parArr);
}

/**
 * Apre la gestione dei turni della ditta di cui si sta visualizzando la giornaliera
 
 * @param {Number} _itemInd
 * @param {Number} _parItem
 * @param {Boolean} _isSel
 * @param {String} _parMenTxt
 * @param {String} _menuTxt
 * @param {JSEvent} event
 * @param {Number} idditta
 *
 * @properties={typeid:24,uuid:"7BA5F3AF-EFBA-46A2-A787-99E0CE3CA884"}
 */
function apriTurni(_itemInd, _parItem, _isSel, _parMenTxt, _menuTxt,event,idditta)
{
	var _filterDitta = new Object();
	_filterDitta.filter_field_name = 'idditta';
	_filterDitta.filter_operator = '=';
	_filterDitta.filter_value = idditta;
	
	var _progObj = globals.nav.program['AGD_Turni'];
	_progObj.filter = [_filterDitta];  
    _progObj.foundset = null;	

	/** @type {Array<Object>} */
	var _parArr = new Array();
		
	globals.openProgram('AGD_Turni',_parArr);
}

/**
 * Apre la gestione del collocamento della ditta di cui si sta visualizzando la giornaliera
 * 
 * @param {Number} _itemInd
 * @param {Number} _parItem
 * @param {Boolean} _isSel
 * @param {String} _parMenTxt
 * @param {String} _menuTxt
 * @param {JSEvent} event
 * @param {Number} idditta
 *
 * @properties={typeid:24,uuid:"CCCDCEB6-8A7F-448D-8351-BBC5AB1FC9D8"}
 */
function apriCollocamento(_itemInd, _parItem, _isSel, _parMenTxt, _menuTxt,event,idditta)
{
	var _filterDitta = new Object();
	_filterDitta.filter_field_name = 'idditta';
	_filterDitta.filter_operator = '=';
	_filterDitta.filter_value = idditta;
	
	var _progObj = globals.nav.program['AGD_Collocamento'];
	_progObj.filter = [_filterDitta];  
    _progObj.foundset = null;	

	/** @type {Array<Object>} */
	var _parArr = new Array();
		
	globals.openProgram('AGD_Collocamento',_parArr);
}

/**
 * Apre la gestione delle presenze della ditta di cui si sta visualizzando la giornaliera
 * 
 * @param {Number} _itemInd
 * @param {Number} _parItem
 * @param {Boolean} _isSel
 * @param {String} _parMenTxt
 * @param {String} _menuTxt
 * @param {JSEvent} event
 * @param {Number} idditta
 *
 * @properties={typeid:24,uuid:"0D389AB1-D208-41F3-8007-81744D2BA750"}
 */
function apriPresenze(_itemInd, _parItem, _isSel, _parMenTxt, _menuTxt,event,idditta)
{
	var _filterDitta = new Object();
	_filterDitta.filter_field_name = 'idditta';
	_filterDitta.filter_operator = '=';
	_filterDitta.filter_value = idditta;
	
	var _progObj = globals.nav.program['AGD_Presenze'];
	_progObj.filter = [_filterDitta];  
    _progObj.foundset = null;	

	/** @type {Array<Object>} */
	var _parArr = new Array();
		
	globals.openProgram('AGD_Presenze',_parArr);
}

/**
 * @param {JSEvent} event
 * @param {Number} idditta
 * 
 * @properties={typeid:24,uuid:"64CFF949-8F76-4D39-B296-F00CDA4D69C3"}
 */
function apriPopupAnaDitta(event,idditta)
{
	var source = event.getSource();
	var frm = event.getFormName();
	
	var popUpMenu = plugins.window.createPopupMenu();
	
	var datiAnag = popUpMenu.addMenuItem('Dati anagrafici',apriDatiAnagDitta);
	    datiAnag.methodArguments = [event,idditta];
	var sediLav = popUpMenu.addMenuItem('Sedi di lavoro',apriSediLavoro);
	    sediLav.methodArguments = [event,idditta];
	    if(globals.getTipologiaDitta(idditta))
	    	sediLav.enabled = false;
	var classificazioni = popUpMenu.addMenuItem('Classificazioni',apriClassificazioniDitta);
	    classificazioni.methodArguments = [event,idditta];
	var inail = popUpMenu.addMenuItem('INAIL',apriINAILDitta);
        inail.methodArguments = [event,idditta];
        if(globals.getTipologiaDitta(idditta))
	    	inail.enabled = false;
    var inps = popUpMenu.addMenuItem('INPS',apriINPSDitta);
	    inps.methodArguments = [event,idditta];
	    if(globals.getTipologiaDitta(idditta))
	    	inps.enabled = false;
	var turni = popUpMenu.addMenuItem('Turni',apriTurni);
	    turni.methodArguments = [event,idditta];
	    if(globals.getTipologiaDitta(idditta))
	    	turni.enabled = false; 
	var collocamento = popUpMenu.addMenuItem('Collocamento',apriCollocamento);
	    collocamento.methodArguments = [event,idditta];
	    if(globals.getTipologiaDitta(idditta) == globals.Tipologia.ESTERNA)
	    	collocamento.enabled = false;
	var presenze = popUpMenu.addMenuItem('Presenze',apriPresenze);
	    presenze.methodArguments = [event,idditta];    
	    if(globals.getTipologiaDitta(idditta))
	    	presenze.enabled = false;
	
	// currently suspended    
//	if(getTipologiaDitta(idditta) == Tipologia.ESTERNA)
//	{
//		var tipologia = popUpMenu.addMenuItem('Cambia tipologia',cambiaTipologia);
//		    tipologia.methodArguments = [event,idditta];
//		    tipologia.enabled = true;
//	}
	    
	if(source != null)
	   popUpMenu.show(forms[frm].elements[event.getElementName()].getLocationX() + forms[frm].elements[event.getElementName()].getWidth() + 100,
		              forms[frm].elements[event.getElementName()].getLocationY() + forms[frm].elements[event.getElementName()].getHeight() + 100);	    
}

/**
 * Restituisce l'array con gli id delle ditte
 * @AllowToRunInFind 
 * 
 * @return {Array}
 * 
 * @properties={typeid:24,uuid:"CD87C8C0-3BF6-4229-B0CC-9912EF8E6232"}
 */
function getDitte()
{
	/** @type {JSFoundSet<db:/ma_anagrafiche/ditte>} */
	var fsDitte = databaseManager.getFoundSet(globals.Server.MA_ANAGRAFICHE,globals.Table.DITTE);
	fsDitte.loadAllRecords();
	
	return globals.foundsetToArray(fsDitte, 'idditta');
}



/**
 * @AllowToRunInFind
 * 
 * Verifica se il codice passato come parametro è stato già utilizzato i prcedenza come codice di una ditta
 *
 * @param {Number} codNuovaDitta
 *
 * @return Boolean
 * @properties={typeid:24,uuid:"59A4F77E-DB71-4103-9FCE-AFEE63A48865"}
 */
function isCodiceDittaDisponibile(codNuovaDitta)
{
	/** @type {JSFoundSet<db:/ma_anagrafiche/ditte>} */
	var fsDitte = databaseManager.getFoundSet(globals.Server.MA_ANAGRAFICHE,globals.Table.DITTE);
    if(fsDitte.find())
    {
    	fsDitte.codice = codNuovaDitta;
    	if(fsDitte.search())
    		return false;
    }
    
    return true;
}

/**
 * @AllowToRunInFind
 * 
 * Restituisce l'identificativo della posizione INPS di default della ditta desiderata
 * 
 * @param {Number} idDitta
 *
 * @properties={typeid:24,uuid:"ACA96DB2-2104-492F-8849-745B9C086C37"}
 */
function getIdDittaInpsDefault(idDitta)
{
	/** @type {JSFoundSet<db:/ma_anagrafiche/ditte_inps>}*/
	var fsDitteInps = databaseManager.getFoundSet(globals.Server.MA_ANAGRAFICHE,globals.Table.DITTE_INPS);
	if(fsDitteInps.find())
	{
		fsDitteInps.idditta = globals.getTipologiaDitta(idDitta) == globals.Tipologia.ESTERNA ? 
                              globals.getDittaRiferimento(idDitta) : idDitta
		fsDitteInps.posizioneinps = 1; // posizione di default
		if(fsDitteInps.search())
			return fsDitteInps.iddittainps;
	}
	return null;
}

/**
 * @AllowToRunInFind
 * 
 * Restituisce la posizione INPS di default della ditta desiderata 
 *  
 * @param {Number} idDitta
 *
 * @properties={typeid:24,uuid:"AFCB16B2-9268-4C42-B43D-DEFD2E1E8166"}
 */
function getCodDittaInpsDefault(idDitta)
{
	/** @type {JSFoundSet<db:/ma_anagrafiche/ditte_inps>}*/
	var fsDitteInps = databaseManager.getFoundSet(globals.Server.MA_ANAGRAFICHE,globals.Table.DITTE_INPS);
	if(fsDitteInps.find())
	{
		fsDitteInps.idditta = globals.getTipologiaDitta(idDitta) == globals.Tipologia.ESTERNA ? 
				              globals.getDittaRiferimento(idDitta) : idDitta;
		fsDitteInps.posizioneinps = 1; // posizione di default
		if(fsDitteInps.search())
			return fsDitteInps.posizioneinps;
	}
	return null;
}

/**
 * @AllowToRunInFind
 * 
 * Restituisce la posizione INPS di default della ditta desiderata 
 *  
 * @param {Number} idDitta
 *
 * @properties={typeid:24,uuid:"B55C37EF-963C-45A1-B220-BDBC1AE65048"}
 */
function getDescDittaInpsDefault(idDitta)
{
	/** @type {JSFoundSet<db:/ma_anagrafiche/ditte_inps>}*/
	var fsDitteInps = databaseManager.getFoundSet(globals.Server.MA_ANAGRAFICHE,globals.Table.DITTE_INPS);
	if(fsDitteInps.find())
	{
		fsDitteInps.idditta = globals.getTipologiaDitta(idDitta) == globals.Tipologia.ESTERNA ? 
				              globals.getDittaRiferimento(idDitta) : idDitta;
		fsDitteInps.posizioneinps = 1; // posizione di default
		if(fsDitteInps.search())
			return fsDitteInps.ditte_inps_to_ditte_attivita.descrizioneateco;
	}
	return null;
}

/**
 * @AllowToRunInFind
 * 
 * Verifica se il turno inserito è valido per la ditta specificata 
 * 
 * @param {JSRecord<db:/ma_anagrafiche/ditte_turni>} record
 * 
 * @return {Boolean}
 *
 * @properties={typeid:24,uuid:"5355D366-FE1E-4BC2-8EBD-9D6E9E76839B"}
 */
function validaDittaTurno(record) {
	var not_valid = false;
	
	var fs = record.foundset.duplicateFoundSet();
	if(fs.find())
	{
		fs.iddittaturno = '!=' + record.iddittaturno;
		fs.idditta = record.idditta;
		fs.codice = record.codice;
		not_valid = fs.search(true) > 0;
	}

	if (not_valid) throw 'Il turno inserito è già presente';

	// return boolean to indicate success
	return true;
}

/**
 * @AllowToRunInFind
 *
 * @properties={typeid:24,uuid:"B2273873-9FF6-4C0F-A66A-76465BD9471A"}
 */
function updateDatiGeneraliEsterni()
{
	var frm = forms.agd_cl_datigenerali_esterni_tbl;
	var fs = frm.foundset;
	var _idDitta = forms.agd_header_esterni_dtl.idditta;
	var _idDittaRif = globals.getDittaRiferimento(_idDitta);
	if(fs.find())
	{
		fs.idditta = [_idDitta,_idDittaRif];
		fs.search();
	}
}

/**
 * @AllowToRunInFind
 *
 * @properties={typeid:24,uuid:"51A072DD-59FD-499A-A3BB-A2164C7E1417"}
 */
function getDitteGestiteEpi2()
{
	/** @type {JSFoundSet<db:/ma_anagrafiche/ditte>} */
	var fsDitte = databaseManager.getFoundSet(globals.Server.MA_ANAGRAFICHE,globals.Table.DITTE);
    if(fsDitte.find())
    {
    	fsDitte.ditte_to_ditte_presenze.ore_gestioneepi2 = 1;
    	if(fsDitte.search())
    		return globals.foundsetToArray(fsDitte,'idditta');
    }
    
    return [];
}

/**
 * @param {Number} idDitta
 * 
 * @return {JSDataSet}
 * @AllowToRunInFind
 *
 * @properties={typeid:24,uuid:"77EC42C9-32DA-4E86-81F3-795EB77D6529"}
 */
function getClassificazioniDitta(idDitta)
{
	/**@type  {JSFoundSet<db:/ma_anagrafiche/ditte_classificazioni>} */
	var fsRagg = databaseManager.getFoundSet(globals.Server.MA_ANAGRAFICHE,globals.Table.DITTE_CLASSIFICAZIONI);
	if(fsRagg.find())
	{
		var arrDitte = [];
		var arrDitteInterinali = globals.getDitteInterinali();
		if(arrDitteInterinali && arrDitteInterinali.indexOf(idDitta) != -1)
		   arrDitte = [globals.getDittaRiferimento(idDitta)];
		arrDitte.push(idDitta);
		
		fsRagg.idditta = arrDitte;
		if(fsRagg.search())
			return databaseManager.convertToDataSet(fsRagg,['iddittaclassificazione','codice','descrizione']);
	}
	
	return null;
}

/**
 * @AllowToRunInFind
 * 
 * TODO generated, please specify type and doc for the params
 * @param idDitta
 * @param codClassificazione
 * 
 * @return {Boolean}
 * 
 * @properties={typeid:24,uuid:"39ECF51F-1616-4755-BAFA-9CF85874480C"}
 */
function isClassificazioneManuale(idDitta,codClassificazione)
{
	/**@type  {JSFoundSet<db:/ma_anagrafiche/ditte_classificazioni>} */
	var fsRagg = databaseManager.getFoundSet(globals.Server.MA_ANAGRAFICHE,globals.Table.DITTE_CLASSIFICAZIONI);
	if(fsRagg.find())
	{
		fsRagg.idditta = idDitta;
		fsRagg.codice = codClassificazione;
		
		if(fsRagg.search())
			return parseInt(fsRagg.codice,10) > 10;
	}
	
	return false;
}

/**
 * @AllowToRunInFind
 * 
 * Restituisce il dataset con le coppie (codice,descrizione) dei dettagli classificazioni
 * 
 * @param {Number} idDittaClassificazione
 *
 * @properties={typeid:24,uuid:"3E9488C7-A67A-49D5-84D9-F9B54E79B25B"}
 */
function getDettaglioClassificazioniDitta(idDittaClassificazione)
{
	/**@type  {JSFoundSet<db:/ma_anagrafiche/ditte_classificazionidettaglio>} */
	var fsDett = databaseManager.getFoundSet(globals.Server.MA_ANAGRAFICHE,globals.Table.DITTE_CLASSIFICAZIONI_DETTAGLIO);
	if(fsDett.find())
	{
		fsDett.iddittaclassificazione = idDittaClassificazione;
		if(fsDett.search())
			return databaseManager.convertToDataSet(fsDett,['codice','descrizione']);
	}
	
	return null;
}

/**
 * @AllowToRunInFind
 * 
 * TODO generated, please specify type and doc for the params
 * @param idDittaClassificazione
 *
 * @properties={typeid:24,uuid:"C5D1CE4D-097C-41B2-B94A-718472CF9179"}
 */
function getCodiceClassificazione(idDittaClassificazione)
{
	/**@type  {JSFoundSet<db:/ma_anagrafiche/ditte_classificazioni>} */
	var fs = databaseManager.getFoundSet(globals.Server.MA_ANAGRAFICHE,globals.Table.DITTE_CLASSIFICAZIONI);
	if(fs.find())
	{
		fs.iddittaclassificazione = idDittaClassificazione;
		
		if(fs.search())
			return fs.codice;
	}
	
	return null;
}

/**
 * @AllowToRunInFind
 * 
 * TODO generated, please specify type and doc for the params
 * @param idDittaClassificazione
 *
 * @properties={typeid:24,uuid:"F84C218E-96A9-4F67-A6AD-BD2647C89E84"}
 */
function getDescClassificazione(idDittaClassificazione)
{
	/**@type  {JSFoundSet<db:/ma_anagrafiche/ditte_classificazioni>} */
	var fs = databaseManager.getFoundSet(globals.Server.MA_ANAGRAFICHE,globals.Table.DITTE_CLASSIFICAZIONI);
	if(fs.find())
	{
		fs.iddittaclassificazione = idDittaClassificazione;
		
		if(fs.search())
			return fs.descrizione;
	}
	
	return null;
}

/**
 * @AllowToRunInFind
 * 
 * Restituisce il valore della descrizione del dettaglio della classificazione
 * 
 * @param {Number} idDittaClassificazione
 * @param {String} codice
 * 
 * @return {String}
 * 
 * @properties={typeid:24,uuid:"EF9D0AE6-AFA8-49E0-9EFA-0AE5162FFD08"}
 */
function getDescDettaglioClassificazione(idDittaClassificazione,codice)
{
	/**@type  {JSFoundSet<db:/ma_anagrafiche/ditte_classificazionidettaglio>} */
	var fsDett = databaseManager.getFoundSet(globals.Server.MA_ANAGRAFICHE,globals.Table.DITTE_CLASSIFICAZIONI_DETTAGLIO);
	if(fsDett.find())
	{
		fsDett.iddittaclassificazione = idDittaClassificazione;
		fsDett.codice = codice;
		
		if(fsDett.search())
			return fsDett.descrizione;
	}
	
	return null;
}

/**
 * Passa da ditta esterna ad interinale e viceversa
 * 
 * @param {Number} _itemInd
 * @param {Number} _parItem
 * @param {Boolean} _isSel
 * @param {String} _parMenTxt
 * @param {String} _menuTxt
 * @param {JSEvent} event
 * @param {Number} idditta
 *
 * @properties={typeid:24,uuid:"A17AFBA6-0315-44D1-A7A6-7DEF38D03C30"}
 * @AllowToRunInFind
 */
function cambiaTipologia(_itemInd, _parItem, _isSel, _parMenTxt, _menuTxt,event,idditta)
{
	var msg = "La tipologia della ditta passerà da ";
	/** @type {JSFoundSet<db:/ma_anagrafiche/ditte>} */
	var fsDitte = databaseManager.getFoundSet(globals.Server.MA_ANAGRAFICHE,globals.Table.DITTE);
    if(fsDitte.find())
    {
    	fsDitte.idditta = idditta;
    	if(fsDitte.search())
    	{
    		var tipoEsterni = fsDitte.ditte_to_ditte_legami.tipoesterni;
    		tipoEsterni == 1 ? msg += "esterna ad interinale." : msg += "interinale ad esterna.";
    		msg += "<br/>Si desidera proseguire?";
    		
    		var answer = globals.ma_utl_showYesNoQuestion(msg,'Cambia tipologia ditta esterna');
    		
    		if(answer)
    		{
    			databaseManager.startTransaction();
    			fsDitte.ditte_to_ditte_legami.tipoesterni = (tipoEsterni == 1) ? 0 : 1;
    			
    			if(!databaseManager.commitTransaction())
    			{
    				databaseManager.rollbackTransaction();
    				globals.ma_utl_showErrorDialog("Errore durante la modifica della tipologia di esterna",'Cambia tipologia ditta esterna');
    				return;
    			}
    			
    			databaseManager.refreshRecordFromDatabase(fsDitte,1);
    		}
    	}
    	else
    		globals.ma_utl_showInfoDialog("Ditta non trovata in anagrafica",'Cambia tipologia ditta esterna');
	}
    else
      	globals.ma_utl_showInfoDialog("Cannot go to find mode",'Cambia tipologia ditta esterna');
	
}