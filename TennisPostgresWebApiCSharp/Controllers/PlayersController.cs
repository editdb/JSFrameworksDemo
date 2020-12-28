using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TennisAngular10.Models;

namespace TennisAngular10.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PlayersController : ControllerBase
    {
        private readonly TennisDBContext _context;

        public PlayersController(TennisDBContext context)
        {
            _context = context;
        }

        // GET: api/Players
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Player>>> GetPlayers()
        {
            return await _context.Player.OrderBy(p => p.Name).ToListAsync();
        }

        // GET: api/PlayersWithCountry
        [HttpGet]
        [Route("/api/PlayersWithCountry")]
        public async Task<ActionResult<IEnumerable<Player>>> GetPlayersWithCountry()
        {
            return await _context.Player.Include(p => p.Country).OrderBy(p => p.Name).ToListAsync();
/*
            return await (
            from p in _context.Player
            join c in _context.Country on p.Country.Id equals c.Id
            orderby p.Name            
            select p
            )
            .ToListAsync();
*/
        }

        // GET: api/Players/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Player>> GetPlayer(long id)
        {
            var player = await _context.Player.FindAsync(id);

            if (player == null) {
                return NotFound();
            }

            return player;
        }

        // GET: api/Players/5
        [HttpGet("/api/PlayerName/{id}")]
        public async Task<ActionResult<String>> GetPlayerName(long id)
        {
            var player = await _context.Player.FindAsync(id);

            if (player == null) {
                return NotFound();
            }

            return player.Name;
        }

        // PUT: api/Players/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPlayer(long id, Player player)
        {
            if (id != player.Id)
            {
                return BadRequest();
            }

            if (player.Name.Trim().Length <= 4) {
                return BadRequest("The Name does not have enough letters");
            }

            _context.Entry(player).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PlayerExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Players
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Player>> PostPlayer(Player player)
        {
            _context.Player.Add(player);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPlayer", new { id = player.Id }, player);
        }

        // DELETE: api/Players/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Player>> DeletePlayer(long id)
        {
            var player = await _context.Player.FindAsync(id);
            if (player == null)
            {
                return NotFound();
            }

            _context.Player.Remove(player);
            await _context.SaveChangesAsync();

            return player;
        }

        private bool PlayerExists(long id)
        {
            return _context.Player.Any(e => e.Id == id);
        }
    }
}
