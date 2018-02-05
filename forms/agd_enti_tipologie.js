
/**
 * Handle record selected.
 *
 * @param {JSEvent} event the event that triggered the action
 * @param _form
 *
 * @private
 *
 * @properties={typeid:24,uuid:"A9C157E4-42CE-4653-8AB1-567E687B27CF"}
 * @AllowToRunInFind
 */
function onRecordSelection(event, _form)
{
	_super.onRecordSelection(event, _form);
	aggiornaCategorieEnti();
}

/**
 * @properties={typeid:24,uuid:"37468900-659A-4B91-9819-3CA496B2AF52"}
 */
function aggiornaCategorieEnti()
{
	var frm = forms.agd_enticategorie;
	var fs = frm.foundset;
	
    var sqlCat = "SELECT TEC.idTabEnteCategoria,TEC.RaggruppaSuCategoria \
           FROM Ditte_Enti DE\
           INNER JOIN MA_Common.dbo.Tab_Enti TE ON DE.idTabEnte = TE.idTabEnte\
           INNER JOIN MA_Common.dbo.Tab_EntiCategorie TEC ON TE.idTabEnteCategoria = TEC.idTabEnteCategoria\
           WHERE DE.idDitta = ? AND TEC.idTabEnteTipologia = ?\
           GROUP BY TEC.idTabEnteCategoria, TEC.Descrizione, TEC.RaggruppaSuCategoria";
    var arrCat = [forms.agd_header_dtl.idditta_sede,idtabentetipologia];
	var dsCat = databaseManager.getDataSetByQuery(globals.Server.MA_ANAGRAFICHE_GENERALE,sqlCat,arrCat,-1);
	
	if(dsCat.getMaxRowIndex())
	   fs.loadRecords(dsCat);
	else
	{
		forms.agd_enticategorie.foundset.clear();
		forms.agd_enti_tbl.foundset.clear();
	}
}

/**
 * @properties={typeid:24,uuid:"20917511-8EEE-4BA6-8505-FDFA4AC12D23"}
 */
function aggiornaTipologieEnti()
{
	var sql = "SELECT TET.idTabEnteTipologia\
        FROM Ditte_Enti DE\
        INNER JOIN MA_Common.dbo.Tab_Enti TE ON DE.idTabEnte = TE.idTabEnte\
        INNER JOIN MA_Common.dbo.Tab_EntiCategorie TEC ON TE.idTabEnteCategoria = TEC.idTabEnteCategoria\
        INNER JOIN MA_Common.dbo.Tab_EntiTipologie TET ON TET.idTabEnteTipologia = TEC.idTabEnteTipologia\
        WHERE DE.idDitta = ?\
        GROUP BY TET.idTabEnteTipologia, TET.Descrizione";
    var ds = databaseManager.getDataSetByQuery(globals.Server.MA_ANAGRAFICHE_GENERALE,
	                                       sql,
										   [forms.agd_header_dtl.idditta_sede],
										   -1);
    if(ds.getMaxRowIndex())
    {
    	foundset.loadRecords(ds);
        aggiornaCategorieEnti();
    }
    else
    {
    	forms.agd_enti_tipologie.foundset.clear();
		forms.agd_enticategorie.foundset.clear();
		forms.agd_enti_tbl.foundset.clear();
    }
    
}

/**
 * Callback method for when form is shown.
 *
 * @param {Boolean} firstShow form is shown first time after load
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"45AAF78F-C84E-47C2-9B3B-0EA04D608460"}
 */
function onShow(firstShow, event) 
{
	_super.onShowForm(firstShow,event);
	if(firstShow)
		aggiornaTipologieEnti();
}
