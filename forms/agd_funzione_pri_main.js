/**
 * @properties={typeid:24,uuid:"D1AEBAA8-FF06-450E-BAA5-14360DCFEE9F"}
 */
function filterData(fs)
{
	_super.filterData(ditte_to_ditte_funzionipersone_privacy);
}

/**
 * @properties={typeid:24,uuid:"80935526-5069-4B2B-97A9-95B1D498422F"}
 */
function unfilterData(fs)
{
	_super.unfilterData(ditte_to_ditte_funzionipersone_privacy)
}

/**
 * @properties={typeid:24,uuid:"9D12A043-CE27-467C-99D9-B53EB3B8E364"}
 */
function sortFoundset(fs)
{
	_super.sortFoundset(ditte_to_ditte_funzionipersone_privacy);
}

/**
 * @protected 
 * @param {JSFoundset} fs
 *
 * @properties={typeid:24,uuid:"976B46C1-819B-4320-92A6-3968FF19AB48"}
 */
function filterRuolo(fs)
{
	fs.addFoundSetFilterParam('codambito', 'LIKE', globals.codPRIVACY + '%');
	return fs;
}

/**
 * @properties={typeid:24,uuid:"16127DB6-9F3A-4426-BB4D-AACF2DD4E115"}
 */
function getEditFormName()
{
	return forms.agd_funzione_pri_edit.controller.getName();
}