/**
 * Handle record selected.
 *
 * @param {JSEvent} event the event that triggered the action
 * @param _form
 *
 * @private
 *
 * @properties={typeid:24,uuid:"70E07864-2587-4DE6-A7F9-B60048D0EB45"}
 */
function onRecordSelection(event, _form) 
{
	_super.onRecordSelection(event, _form);
	
	if(ditte_ratei_to_ditte_rateiscadenziario && ditte_ratei_to_ditte_rateiscadenziario.liquidaap === globals.TIPO_LIQUIDAZIONE.sinoal)
	{
		elements.fld_periodoprecedente.visible = true;
		elements.fld_percentualematurato.visible = false;
		elements.fld_sinoalmese.visible = false;
	}
	else if(ditte_ratei_to_ditte_rateiscadenziario && ditte_ratei_to_ditte_rateiscadenziario.liquidaap !== globals.TIPO_LIQUIDAZIONE.sinoal)
	{
		elements.fld_periodoprecedente.visible = false;
		elements.fld_percentualematurato.visible = true;
		elements.fld_sinoalmese.visible = true;
	}
	else
	{
		elements.fld_periodoprecedente.visible = false;
		elements.fld_percentualematurato.visible = false;
		elements.fld_sinoalmese.visible = false;
	}
}
