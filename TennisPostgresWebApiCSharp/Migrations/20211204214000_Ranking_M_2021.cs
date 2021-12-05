using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace TennisAngular10.Migrations
{
    public partial class Ranking_M_2021 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(@"
INSERT INTO tennis2.country (code, name, image_link) VALUES
('gre', 'Greece', 'http://a.espncdn.com/i/flags/20x13/gre.gif');
");
            // 20 Greece

            migrationBuilder.Sql(@"
INSERT INTO tennis2.player (name, country_id, handed, dob, home_town, height_feet, height_inches, weight, gender, turned_pro) VALUES
('Daniil Medvedev', 19, 'R', '1996-02-11', 'Moscow', 6, 6, 183, 'M', 2014),
('Stefanos Tsitsipas', 20, 'R', '1998-08-12', 'Athens', 6, 4, 198, 'M', 2016),
('Andrey Rublev', 19, 'R', '1997-10-20', 'Moscow', 6, 2, 154, 'M', 2014);
");
            // 25 Daniil Medvedev
            // 26 Stefanos Tsitsipas
            // 27 Andrey Rublev

            migrationBuilder.Sql(@"
DELETE FROM tennis2.ranking where year=2019;

INSERT INTO tennis2.ranking (player_id, year, movement, rank, points, prize_money, singles_titles, doubles_titles, singles_win, singles_loss) VALUES
(2,  2019, 0, 1, 9985, 16349586, 4, 0, 58,  7),
(1,  2019, 0, 2, 9145, 13372355, 5, 0, 57, 11),
(3,  2019, 0, 3, 6590, 8716975, 4, 0, 53,  10),
(4,  2019, 0, 4, 5825, 8000223, 5, 0, 49,  19),
(25, 2019, 0, 5, 5705, 7902912, 4, 0, 59,  21),

(1,  2020, 0, 1, 12030, 6052233, 4, 0, 39,  3),
(2,  2020, 0, 2,  9850, 3422202, 2, 0, 25,  5),
(4,  2020, 0, 3,  9125, 5169756, 1, 0, 22,  7),
(25, 2020, 0, 4,  8470, 2058891, 1, 0, 23, 10),
(3,  2020, 0, 5,  6630,  714792, 0, 0,  5,  1),

(1,  2021, 0, 1, 11540, 9100547, 5, 0, 51,  7),
(25, 2021, 0, 2,  8640, 7481271, 4, 0, 58, 13),
(5,  2021, 0, 3,  7840, 6420344, 6, 0, 59, 15),
(26, 2021, 0, 4,  6540, 3579155, 2, 0, 55, 19),
(27, 2021, 0, 5,  5150, 3331378, 1, 1, 49, 22);
");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
        }
    }
}
