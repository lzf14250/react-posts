import React, { Component } from 'react';
import { Card, CardHeader, CardBody } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { Loading } from './LoadingComponent';

function Userlist(props) {
    if (props.users.isLoading) {
        return (
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    }
    else if (props.users.errMess) {
        return (
            <div className="container">
                <div className="row">
                    <h4>{props.users.errMess}</h4>
                </div>
            </div>
        );
    }

    const usersCardList = props.users.users.map((user) => {

        var street = user.address.street;
        var suite = user.address.suite;
        var city = user.address.city;
        var zipCode = user.address.zipcode;

        return (
            <div className="col-12 col-md-5 m-1">
                <NavLink to={`/users/${user.id}`}>
                    <Card>
                        <CardHeader className="bg-primary text-white">
                            <div>
                                <span>{user.name} </span>
                                ({user.username})
                            </div>
                        </CardHeader>
                        <CardBody>
                            <dl className="row p-1">
                                <dt className="col-6">Email</dt>
                                <dd className="col-6">{user.email}</dd>
                                <dt className="col-6">Phone</dt>
                                <dd className="col-6">{user.phone}</dd>
                                <dt className="col-6">Address</dt>
                                <dd className="col-6">{street + ' ' + suite + ', ' + city + ' ' + zipCode}</dd>
                                <dt className="col-6">Website</dt>
                                <dd className="col-6">{user.website}</dd>
                                <dt className="col-6">Company</dt>
                                <dd className="col-6">{user.company.name}</dd>
                            </dl>
                        </CardBody>
                    </Card>
                </NavLink>
            </div>
        );
    })

    return (
        <div className="container">
            <div className="row">
                {usersCardList}
            </div>
        </div>
    );
}

export default Userlist;