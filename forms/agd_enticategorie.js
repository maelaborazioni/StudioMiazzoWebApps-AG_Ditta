
/**
 * Handle record selected.
 *
 * @param {JSEvent} event the event that triggered the action
 * @param _form
 *
 * @private
 *
 * @properties={typeid:24,uuid:"061691FD-46D8-494F-9A78-353109B5A439"}
 * @AllowToRunInFind
 */
function onRecordSelection(event, _form)
{
//	_super.onRecordSelection(event, _form);
	
    //TODO visualizzazione username e password 	
	var groupByDati = foundset.raggruppasucategoria != null ? foundset.raggruppasucategoria : 0;
	forms.agd_enti.elements.tab_categorie_web.visible = groupByDati; 
	forms.agd_enti.elements.tab_enti_web.visible = 	!groupByDati;	
	
	aggiornaEnti();

}

/**
 * @properties={typeid:24,uuid:"E8167A6B-B92C-4397-A4A0-367308B0B827"}
 * @AllowToRunInFind
 */
function aggiornaEnti()
{
	var frm = forms.agd_enti_tbl;
	var fs = frm.foundset;
	
	var sqlTip = "SELECT DE.idDittaEnte FROM Ditte_Enti DE \
                  INNER JOIN MA_Common.dbo.Tab_Enti TE ON DE.idTabEnte = TE.idTabEnte \
                  WHERE DE.idDitta = ? AND TE.idTabEnteCategoria = ? \
                  ORDER BY TE.Codice";
	var arrTip = [forms.agd_header_dtl.idditta_sede,idtabentecategoria];
	var daTip = databaseManager.getDataSetByQuery(globals.Server.MA_ANAGRAFICHE_GENERALE,sqlTip,arrTip,-1);
	
	if(daTip.getMaxRowIndex())
	{
		fs.find();
		fs.iddittaente = daTip.getColumnAsArray(1);
		fs.search();
	}
	else
		fs.clear();
	
}