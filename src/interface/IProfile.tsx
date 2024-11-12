export default interface IProfile {
    name: string,
    date_of_birth: string,
    state_of_origin: string,
    local_government: string,
    base_location: string,
    association_chapter: string,
    post_held: string,
    radio_shows: string[],
    station: string,
    year_started: number | number,
    educational_background: string
}