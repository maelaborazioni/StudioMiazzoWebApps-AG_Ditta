/**
 * @properties={type:8,typeid:36,uuid:"8C8AE714-C3BC-49D5-BAF7-F3854B159254"}
 */
function iddittalegata()
{
	return tipologia != globals.Tipologia.STANDARD ? ditte_to_ditte_legami.iddittariferimento : idditta;
}

/**
 * @properties={type:12,typeid:36,uuid:"5EFBE03A-CB14-4907-8922-74D97AB02FAF"}
 */
function desc_estero()
{
	return residenteestero ? 'Soggetto non residente' : 'Soggetto residente';
}
