/**
 * @param {JSFoundset} _fs
 *
 * @properties={typeid:24,uuid:"7E31C5F5-7250-4ED9-9A67-F58DBBDFA96B"}
 */
function FiltraDitta(_fs)
{
	_fs.addFoundSetFilterParam('idditta','=',forms.agd_header_dtl.idditta);
	return _fs;
}

/**
 * @param {JSRecord} _rec
 *
 * @properties={typeid:24,uuid:"10306AA0-591C-416C-89E7-942239AD0535"}
 */
function AggiornaTipoRateo(_rec)
{
   forms.agd_pres_af_dtl.classerateo = _rec['classerateo'];
}