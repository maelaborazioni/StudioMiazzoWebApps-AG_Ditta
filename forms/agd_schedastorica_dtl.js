/**
 * 
 * @param {JSRecord} _rec
 *
 * @properties={typeid:24,uuid:"EBA1DD78-B24E-484B-B5D9-B68A1F085E5F"}
 */
function AggiornaCategoria(_rec)
{
	
}

/**
 * 
 * @param {JSFoundset} _fs
 *
 * @properties={typeid:24,uuid:"41527019-EAEE-482D-A911-B333BAA73118"}
 */
function FiltraCategoria(_fs)
{
	_fs.addFoundSetFilterParam('idditta','=',forms.agd_header_dtl.idditta);
	
	return _fs;
}