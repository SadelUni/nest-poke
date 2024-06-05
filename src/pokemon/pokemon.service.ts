import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Pokemon } from './entities/pokemon.entity';
import { Model, isValidObjectId } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class PokemonService {

  constructor(

    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>
  ) { }

  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLocaleLowerCase();


    try {

      const createdPokemon = await this.pokemonModel.create(createPokemonDto);

      return createdPokemon;
    } catch (error) {
      if (error.code === 11000) {
        throw new BadRequestException(`Pokemon already exists with: ${JSON.stringify(error.keyValue)}`);
      }
      throw new InternalServerErrorException(`Error creating pokemon: ${error}`);

    }


  }

  findAll() {
    return `This action returns all pokemon`;
  }

  async findOne(term: string) {

    let pokemon: Pokemon;

    // numbner id
    if (!isNaN(+term)) {
      pokemon = await this.pokemonModel.findOne({
        no: term
      })
    }

    // mongoose id
    if (isValidObjectId(term)) {
      pokemon = await this.pokemonModel.findById(term)
    }


    // string name
    if (!pokemon) {
      pokemon = await this.pokemonModel.findOne({
        name: term.toLocaleLowerCase().trim()
      })
    }


    if (!pokemon) throw new BadRequestException(`Pokemon not found with term: ${term}`)

    return pokemon;
  }

  async update(term: string, updatePokemonDto: UpdatePokemonDto) {

    const pokemon = await this.findOne(term);

    try {


      if (updatePokemonDto.name) {
        updatePokemonDto.name = updatePokemonDto.name.toLocaleLowerCase();
      }

      await pokemon.updateOne(updatePokemonDto);

      return { ...pokemon.toJSON(), ...updatePokemonDto };

    } catch (error) {

      this.handleExeception(error);

    }
  }

  async remove(term: string) {



    // const result = await this.pokemonModel.findByIdAndDelete(term);
    
    const {
      deletedCount: result
    } = await this.pokemonModel.deleteOne({ _id: term });

    if (result === 0) {
      throw new BadRequestException(`Pokemon not found with term: ${term}`);
    }

    return result;


  }

  private handleExeception(error: any) {
    if (error.code === 11000) {
      throw new BadRequestException(`Pokemon already exists with: ${JSON.stringify(error.keyValue)}`);
    }
    throw new InternalServerErrorException(`Error creating pokemon: ${error}`);
  }
}
