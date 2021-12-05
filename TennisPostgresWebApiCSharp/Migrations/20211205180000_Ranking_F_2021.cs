using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace TennisAngular10.Migrations
{
    public partial class Ranking_F_2021 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(@"
INSERT INTO tennis2.country (code, name, image_link) VALUES
('aus', 'Australia', 'http://a.espncdn.com/i/flags/20x13/aus.gif'),
('blr', 'Belarus', 'http://a.espncdn.com/i/flags/20x13/blr.gif');
");
            // 21 Australia
            // 22 Belarus

            migrationBuilder.Sql(@"
INSERT INTO tennis2.player (name, country_id, handed, dob, home_town, height_feet, height_inches, weight, gender, turned_pro) VALUES
('Ashleigh Barty',      21, 'R', '1996-04-24', 'Ipswich, Aus', 5, 5, 137, 'F', 2010),
('Bianca Andreescu',     9, 'R', '2000-06-16', 'Mississauga', 5, 7, 141, 'F', 2017),
('Sofia Kenin',         16, 'R', '1998-11-14', 'Moscow', 5, 7, 139, 'F', 2017),
('Aryna Sabalenka',     22, 'R', '1998-05-05', 'Minsk', 6, 0, 176, 'F', 2015),
('Barbora Krejcikova',  11, 'R', '1995-12-18', 'Brno', 5, 10, 140, 'F', 2014);
");
            // 28 Ashleigh Barty
            // 29 Bianca Andreescu
            // 30 Sofia Kenin
            // 31 Aryna Sabalenka
            // 32 Barbora Krejcikova

            migrationBuilder.Sql(@"
INSERT INTO tennis2.ranking (player_id, year, movement, rank, points, prize_money, singles_titles, doubles_titles, singles_win, singles_loss) VALUES
(28,  2019, 0, 1, 7851, 11307587, 4, 1, 57, 13),
(13,  2019, 0, 2, 5940,  5138077, 4, 0, 52, 17),
(12,  2019, 0, 3, 5496,  6788282, 3, 0, 40, 11),
(14,  2019, 0, 4, 5462,  6962442, 1, 0, 43, 17),
(29,  2019, 0, 5, 5183,  6504150, 3, 0, 48,  7),

(28,  2020, 0, 1, 8717, 1078902, 1, 0, 11, 3),
(14,  2020, 0, 2, 7255, 1937890, 3, 0, 23, 3),
(12,  2020, 0, 3, 5780, 3352755, 1, 0, 16, 3),
(30,  2020, 0, 4, 5760, 4302970, 2, 0, 24, 9),
(18,  2020, 0, 5, 5260,  625299, 2, 0, 19, 9),

(28,  2021, 0, 1, 7582, 3945182, 5, 1, 42,  8),
(31,  2021, 0, 2, 6380, 2909281, 2, 2, 45, 18),
(20,  2021, 0, 3, 5780, 2846871, 3, 0, 42, 17),
(13,  2021, 0, 4, 5135, 2868865, 0, 0, 37, 19),
(32,  2021, 0, 5, 5008, 3646883, 3, 4, 45, 19);

");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
        }
    }
}
