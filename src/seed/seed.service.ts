import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { PokeResponse, Result } from './interfaces/poke-response.inferface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { CreatePokemonDto } from 'src/pokemon/dto/create-pokemon.dto';

@Injectable()
export class SeedService {

  private readonly axios: AxiosInstance = axios;

  constructor(

    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>


  ) { }

  async executeSeed() {
    const { data } = await this.axios.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=50')
    try {

      data.results.forEach(async (pokemon) => {
        const { name, url } = pokemon;



        const segment = url.split('/');
        const no = +segment[segment.length - 2]

        const createPokemonDto: CreatePokemonDto = {
          no,
          name
        }

        const currentPoke = await this.pokemonModel.findOne({ no })

        if (createPokemonDto.name != createPokemonDto.name && currentPoke.no != createPokemonDto.no) {
          await this.pokemonModel.create(createPokemonDto)

        }





      })



    } catch (error) {
      throw new Error(`Error creating pokemon: ${error}`)

    }



    return await this.pokemonModel.find();
  }

}

