import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { PokeResponse, Result } from './interfaces/poke-response.inferface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { CreatePokemonDto } from 'src/pokemon/dto/create-pokemon.dto';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';

@Injectable()
export class SeedService {

  private readonly axios: AxiosInstance = axios;

  constructor(

    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,

    private readonly axiosAdapter: AxiosAdapter


  ) { }

  async executeSeed() {
    await this.pokemonModel.deleteMany({})

    const data  = await this.axiosAdapter.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=50')

    //const insertPromiseArray = [];

    const insertManyArray: {no: number, name: string}[] = [];



    data.results.forEach(async (pokemon) => {
      const { name, url } = pokemon;



      const segment = url.split('/');
      const no = +segment[segment.length - 2]

      const createPokemonDto: CreatePokemonDto = {
        no,
        name
      }

      insertManyArray.push(createPokemonDto)



      // insertPromiseArray.push(this.pokemonModel.create(createPokemonDto))
      






    })

    await this.pokemonModel.insertMany(insertManyArray)







    return await this.pokemonModel.find();
  }

}

