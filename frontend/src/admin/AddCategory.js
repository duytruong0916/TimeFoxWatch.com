import React from 'react';
import Layout from '../core/Layout';
import { connect } from 'react-redux';
import { CreateCategory } from '../redux-store/actions/admin'
import { Link} from 'react-router-dom'
export class AddCategory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            error: '',
            success:''
        }
    }
    onNameChange = (e) => {
        const name = e.target.value;
        this.setState(() => ({ name }));
    }
    onSubmit = (e) => {
        e.preventDefault();
        if(!this.state.name){
            this.setState(()=>({error: 'Missing name field!', success: ''}))
        }else
        {
            this.setState(()=>({error: '', success: 'A new category was successfully created!'}))
            const category = { name: this.state.name };
            CreateCategory(this.props.user.user._id, this.props.user.token, category)
            .then((data) => {
               if(data.error){
                   const error=  data.error;
                   this.setState(()=>({error}))
               }
            })
        }
       
    }
    AddCategoryForm = () => {
        return (
            <form onSubmit={this.onSubmit}>
                <span className="font-weight-bold">Category Name:</span>
                <input
                    className='text-input w-50 ml-4'
                    type='text'
                    placeholder='Category name'
                    value={this.state.name}
                    onChange={this.onNameChange} />
                {this.state.error&&!this.state.success&&(<div className='text-center mt-4 text-danger'>{this.state.error}</div>)}
                {!this.state.error&&this.state.success&&(<div className='text-center mt-4 text-success'>{this.state.success}</div>)}
                <div>
                     <button className="button mt-3 w-25">ADD</button>
                </div>
            </form>
        )
    }
    render() {

        return (
            <Layout title='Add a new category' description='Create a new category'>
                <div className='row'>
                    <div className='col-md-8 offset-md-2'>
                        {this.AddCategoryForm()}
                        <Link to ='/admin/dashboard'>Go back to dashboard</Link>
                    </div>
                </div>
            </Layout>

        )
    }
}

const MapStateToProps = (state) => ({
    isAuthenticated: !!state.auth.user,
    user: state.auth.user
})
const MapDispatchToProps = (dispatch) => ({
    AddCategory: (userid, token, category) => dispatch(CreateCategory(userid, token, category))
})
export default connect(MapStateToProps, MapDispatchToProps)(AddCategory);